在https://nodejs.org/en安裝 nodejs 和 npm

下載檔案並將其保存在桌面上

造訪 github.com 建立一個名為 tea-xyz-quest 的儲存庫（必須是公共儲存庫）

請造訪https://www.npmjs.com建立帳戶

Sửa 文件 package.json，theo 格式

名稱 => @username_npm/tea-xyz-quest
作者 => @使用者名稱_npm
儲存庫 => 連結到剛剛建立的 github 儲存庫
造訪新建立的github儲存庫並上傳新編輯的資料夾（例如：https: //github.com/.../tea-xyz-quest/upload）

開啟終端，輸入「npm -v」檢查步驟1中的npm是否已成功安裝

輸入指令「cd Desktop/tea-xyz-quest」指向程式碼目錄

"npm login" => 有連結可以點擊，開啟瀏覽器，進入 npm 登入網站

成功登入後，輸入指令「npmpublish --access public」即可在npmpublish上發布套件。造訪 npm 查看範例：https ://www.npmjs.com/package/@daominhhiep/tea-xyz-quest

Truy cập app.tea.xyz => 註冊一個新的 OSS 項目

搜尋您剛剛建立的套件名稱。例如：@daominhhiep/tea-xyz-quest 。此步驟可能需要長達 2-3 天，新套件才會出現在 tea.xyz 的系統上

然後 tea 會給出一個名為 tea.yaml 的文件，下載它並返回 github 儲存庫，再次上傳該文件，就完成了。

供參考的範例專案：https://github.com/daominhhiep/tea-xyz-quest
