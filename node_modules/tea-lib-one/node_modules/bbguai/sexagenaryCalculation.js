
const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function getHeavenlyStem(index) {
    return heavenlyStems[index % 10];
}

function getEarthlyBranch(index) {
    return earthlyBranches[index % 12];
}

function getSexagenary(year) {
    // 计算年的天干地支
    const yearIndex = year - 4; // 以1900年为基准年，1900年是甲子年
    const stem = getHeavenlyStem(yearIndex);
    const branch = getEarthlyBranch(yearIndex);
    return stem + branch;
}

module.exports = { getSexagenary };
