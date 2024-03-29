#! /bin/bash
# @author david@clearspring.com
# @date 20090917


function halp () {
    cat >&2 <<-HALP
    u.js Build Script
    
    Usage:     $( basename $0 ) [options]
    
    Assembles all permutations of the u.js library and minifies them.
    
    Options:
        -h              Displays this help.
HALP
}

function fail () {
    echo "PREDICTABLE FAILURE. $1" >&2
    exit 1
}

function join () { seps="$IFS"; IFS="$1"; shift; echo "$*"; IFS="$seps"; }

SHIFT=0
function incshift () {
    SHIFT=$(( $SHIFT + ${1:-1} ))
}

for opt in $*; do
    case "$opt" in
        -h | -he | -hel | -help | --h | --he | --hel | --help ) 
            halp; exit 0 ;;
    esac
done

# while getopts "h" opt; do
#     case $opt in
#         h ) halp; exit 0 ;;
#     esac
# done
# shift $SHIFT

function no_compression () {
    cat $*
}

function yui_compressor () {
    java -jar $YUI_COMPRESSOR_JAR --type js $*
}

function google_closure () {
    java -jar $CLOSURE_COMPILER_JAR --compilation_level ADVANCED_OPTIMIZATIONS $*
}

function ujs_build () {
    local build="$1"
    local minifier="$2"
    local is_global="$3"
    
    printf "Building u.js ${build}${is_global} with $minifier minification... "
    
    local srcs
    local header="_header"
    local footer="_footer"
    local compressor
    local out="dist/u"
    
    # Configure Build
    case "$build" in
        *base* ) 
            srcs="u"
        ;;
        *dom* )
            srcs="u listen"
            footer="${footer}_dom"
            out="${out}-dom"
        ;;
        * )
            fail "Unknown Build Type!"
        ;;
    esac
    
    # Add Global Tag
    if [ "$is_global" ]; then
        out="${out}.global"
    fi
    
    # Configure Minifier
    case "$minifier" in
        no | "" )
            compressor="no_compression"
        ;;
        yui )
            compressor="yui_compressor"
            out="${out}.min"
        ;;
        gmin )
            footer="${footer}${is_global}.gmin"
            compressor="google_closure"
            out="${out}.gmin"
        ;;
        * )
            fail "Unknown Minifier!"
        ;;
    esac
    
    # Add Module Wrapper
    if [ ! "$is_global" -o "$minifier" = "gmin" ]; then
        srcs="$header $srcs $footer"
    fi
    
    local src_paths=$(for src in $srcs; do echo "src/${src}.js"; done)
    
    cat $src_paths | $compressor > "${out}.js"
}

for build in base dom; do
for is_global in "" "_global"; do
for minifier in no yui gmin; do

    if ujs_build ${build} $minifier ${is_global}; then
        echo "ok"
    else
        fail "onoes"
    fi

done; done; done

echo "u.js built!"

