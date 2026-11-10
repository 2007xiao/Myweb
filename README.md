# 襄阳 · 汉水之畔的千年回响

一个纯静态的城市介绍网页：单页 8 个栏目 + 右侧固定目录，零框架、零构建、零外部依赖，双击 `index.html` 即可浏览，也可以直接部署到任意静态托管（GitHub Pages / Netlify / Vercel / 校内服务器）。

## 打开与发布

- 本地：双击 `myweb/index.html`（所有图片走 `image/` 相对路径，用 `file://` 打开也能完整显示）。
- 起服务：在本目录执行 `python -m http.server 8000`，访问 `http://127.0.0.1:8000/`。
- 发布：把整个 `myweb/` 目录上传即可，不需要改任何路径。网页不引用任何外链图片与 CDN 字体。

## 页面结构

| 栏目 | 锚点 | 内容 |
| --- | --- | --- |
| 01 城市印象 | `#about` | 地理位置、汉水与古城、三层城市记忆 + 关键数字 |
| 02 襄阳味道 | `#food` | 牛肉面、黄酒、豆腐面、宜城大虾、盘鳝 |
| 03 千年文脉 | `#culture` | 铁打城墙、三顾茅庐与《隆中对》、柳编非遗、米芾与米公祠 |
| 04 山水名胜 | `#sights` | 城墙、古隆中、唐城、习家池、鹿门山、鱼梁洲（航拍 + 图集 + 六条备注） |
| 05 人文日常 | `#people` | 过早、汉江边的生活、老街巷更新、四季与节庆 |
| 06 向新而行 | `#future` | 汽车与装备制造、高铁枢纽、文旅融合、滨江空间 |
| 07 出行指南 | `#guide` | 季节选择、三日节奏、交通提示与三条小提醒 |
| 08 延伸阅读 | `#sources` | 政府与媒体资料来源 |

## 交互与可访问性

- 右侧目录常驻，滚动时按视口探针自动高亮当前栏目；每项之间留 4px 间距，卡片之间彼此分离。
- `上一节 / 下一节` 按钮，快捷键 `Alt+↑/↓` 与 `Alt+K/J`。
- 深/浅主题切换，选择记在 `localStorage['xiangyang-theme']`，并跟随系统偏好。
- 宽度小于 1040px 时右侧目录收进抽屉，由右上角按钮打开，`Esc` 或点击遮罩关闭。
- 图片缺失时自动降级为文字占位块；`prefers-reduced-motion` 下关闭渐入动画；打印样式隐藏目录与按钮。

## 文件

- `index.html`：页面结构与文案（约 390 行，语义化 `section` / `figure` / `figcaption`）
- `assets/css/style.css`：样式（栏目交替底色、右侧目录布局、响应式断点 1180 / 1040 / 640）
- `assets/js/app.js`：主题、目录高亮、快捷键、抽屉、渐入与图片兜底
- `image/`：29 张本地配图，共 4.1 MB，全部按内容逐张核对过
- `模板说明原稿.md`：源模板随附说明

## 配图说明

原模板使用 Unsplash 远程图，与襄阳实景无关；本版改为逐张核对的本地实景照片，每张图在页面内都标注了来源媒体。图片来自公开报道与政府网站，仅用于课程作业的城市介绍，版权归原作者与发布媒体所有。

| 文件 | 尺寸 | 图片原始标题（用于核对内容） | 来源站点 |
| --- | --- | --- | --- |
| `image/aerial-2.jpg` | 825×475 | 比小说里更美,航拍金庸笔下的襄阳城_汉水襄阳 | xiangyang.cjyun.org |
| `image/binjiang.jpg` | 1427×985 | 十里江滩,焕彩出新!襄阳城区再添一大型公园 | xiangyang.cjyun.org |
| `image/citizen.jpg` | 1080×810 | 襄阳人的夏日狂欢:汉江游泳,夜市美食 | xiangyang.cjyun.org |
| `image/city-aerial.jpg` | 800×450 | 图为襄阳市航拍。 新华网发 杨东摄 | finance.sina.com.cn |
| `image/daxia.jpg` | 800×533 | 雷河镇:在诗和远方邂逅宜城大虾 | www.yichengnews.com |
| `image/doufunoodles.jpg` | 1080×1410 | 襄阳豆腐面:减肥者的早餐首选 | mbd.baidu.com |
| `image/feiyi.jpg` | 1200×675 | 湖北襄阳一地为中国三大柳编出口基地之一,非遗传承人一枝柳条演绎“指尖”传奇 | news.cnhubei.com |
| `image/gaotie.jpg` | 799×449 | 襄阳东站正式竣工完成 古城“高铁新时代” | news.cnr.cn |
| `image/gulaozhong.jpg` | 1143×768 | 襄阳首个5A景区古隆中,诸葛亮曾在此躬耕务农的隐居地 | blog.sina.com.cn |
| `image/hanjiang-bridge.jpg` | 1080×731 | 世界第四座三塔式悬索桥! 刚刚,襄阳凤雏大桥落成通车 | news.cnhubei.com |
| `image/huangjiu.jpg` | 1080×1410 | 襄阳黄酒:送礼自用的佳选 | mbd.baidu.com |
| `image/lumen.jpg` | 800×529 | 襄州区"鹿门山景区"成功晋升为国家"3a"级景区 | www.zgxy.gov.cn |
| `image/mifugongci.jpg` | 1080×810 | 襄阳米公祠荣获“中国华侨国际文化交流基地”称号 | tzb.xiangyang.gov.cn |
| `image/museum.jpg` | 1417×945 | 襄阳市博物馆举办"牛"文物展 | news.cnhubei.com |
| `image/night-street.jpg` | 1600×900 | 湖北襄阳:古城夜游焕新彩 文旅融合热力足 | fashion.ifeng.com |
| `image/niuroumian.jpg` | 900×600 | 这家襄阳老字号的牛肉面，12元一碗，外加一碗黄酒或襄北豆奶|襄阳|豆奶|牛肉面|黄酒|老字号_新浪新闻 |  |
| `image/old-street.jpg` | 1200×748 | 烟火荆楚|千年古巷绽新颜,湖北襄阳"管家巷"文化休闲街区 | www.ctdsb.net |
| `image/oldcity-night.jpg` | 1600×748 | 当超级月亮遇到襄阳夜色,就有了月夜! | xiangyang.cjyun.org |
| `image/panchan.jpg` | 800×444 | 湖北宜城盘鳝_央广网 | country.cnr.cn |
| `image/panorama.jpg` | 1080×707 | 小记者带你720度VR全景漫游襄阳古城 | xiangyang.cjyun.org |
| `image/qiche.jpg` | 700×467 | 襄阳高新区东风新能源整车项目车间,检测员在生产线上检测新能源汽车。(湖北日报全媒记者 田悦 通讯员 王懿 谢勇 摄) | news.sina.com.cn |
| `image/tangcheng-night.jpg` | 1280×960 | 湖北省 襄阳市 中国唐城 夜景 | k.sina.com.cn |
| `image/tangcheng.jpg` | 1280×720 | 打卡襄阳唐城影视基地 感受大唐盛世繁荣之景！唐城夜游重磅重启，7月1日至8月31日，唐城日间游延长至夜间21:30，大美襄阳欢迎您！_腾讯视频 |  |
| `image/wall-men.jpg` | 800×531 | 襄阳城墙临汉门(小北门) | wlj.nanjing.gov.cn |
| `image/xijiachi.jpg` | 1000×666 | 习家池 | k.sina.com.cn |
| `image/xuefu.jpg` | 1600×1080 | 湖北省襄阳市3:前临汉江,背靠群山,城墙坚固,城河宽阔 | k.sina.com.cn |
| `image/yuliangzhou.jpg` | 1080×719 | 绿色映底蕴 山水见初心--鱼梁洲奋力打造襄阳生态文明建设先行示范区 | sthjj.xiangyang.gov.cn |
| `image/zaoshi.jpg` | 1600×1075 | 襄阳特色牛肉面,牛杂面,牛油面是襄阳人最喜欢的早餐,2015年,襄阳牛肉 | mbd.baidu.com |
| `image/zhaomingtai.jpg` | 800×518 | 襄阳昭明台 | www.hubei.gov.cn |

## 说明

页面为课程学习作品，非官方发布；文字依据公开的城市概况、文旅线路与新闻报道整理，票务、开放时间与演出安排请以景区与官方公告为准。
