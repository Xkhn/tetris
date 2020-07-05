
        //常量
        var STEP = 25;
        //分割容器
        //18行 10列
        var ROW_COUNT = 16,
            COL_COUNT = 9;
        //PC下一个模型容器
        colcount = 5;
        //当前使用的模型
        var currentModel = {}
        //下一个模型
        var newModel = {}
        //颜色
        var color = ''
        //分数
        var mark = 0;
        //记录最高分
        var maxScore = 0;
        //记录所有块元素的位置
        //K=行_列:v=块元素
        var fixedBlocks = {}
        //16宫格的位置
        var currentX = 0,
            currentY = 0;
        //手指触摸位置
        var oldX = 0,
            oldY = 0;
        //关卡名字
        var Level = '第一关';
        //关卡数值
        var LevelNumber = 1;
        //定时器
        var mInterval = null;
        //加分数值
        var BounsPoints = 0;
        //掉落速度
        var Speed = 0;
        //循环数值
        var Number = 0;
        //游戏状态
        var Game = true;
        //音效开关
        var MusicPlay = false;
        // 旋转动画开关
        var RotatePlay = false;
        //模型数据
        var MoDELS = [
            {
                0: {
                    row: 2,
                    col: 1
                },
                1: {
                    row: 2,
                    col: 2
                },
                2: {
                    row: 2,
                    col: 3
                },
                3: {
                    row: 1,
                    col: 3
                }
            },
            //第二个模型数据源（凸型）
            {
                0: {
                    row: 1,
                    col: 2
                },
                1: {
                    row: 2,
                    col: 1
                },
                2: {
                    row: 2,
                    col: 2
                },
                3: {
                    row: 2,
                    col: 3
                }
            },
            //第三个模型数据源（田）
            {
                0: {
                    row: 1,
                    col: 2
                },
                1: {
                    row: 2,
                    col: 2
                },
                2: {
                    row: 1,
                    col: 3
                },
                3: {
                    row: 2,
                    col: 3
                }
            },
            //第四个样式(一)
            {
                0: {
                    row: 2,
                    col: 1
                },
                1: {
                    row: 2,
                    col: 2
                },
                2: {
                    row: 2,
                    col: 3
                },
                3: {
                    row: 2,
                    col: 4
                }
            },
            //第五个样式(Z)
            {
                0: {
                    row: 1,
                    col: 1
                },
                1: {
                    row: 1,
                    col: 2
                },
                2: {
                    row: 2,
                    col: 2
                },
                3: {
                    row: 2,
                    col: 3
                }
            }
        ]
        //入口函数
        function init() {
            ScreenWidth();
            BestScore();
            StartSetting();
            NextModel();
            Create();
            onKeyDown();
            onTouch();
        }
        //下一个模型
        function NextModel() {
            //减少使用全局变量
            var doc = document;
            //随机下一个模型
            newModel = MoDELS[_.random(0, MoDELS.length - 1)];
            //随机下一个模型的颜色
            color = getColor();
            var Color = color
            //生成模型对应的DIV
            for (var key in newModel) {
                //添加模型到PC下一个模块的容器中
                var block = document.createElement("div");
                block.className = "new_model";
                block.style.background = Color;
                doc.getElementById("next_block").appendChild(block);
                //添加模型到移动端下一个模块的容器中
                var phoneblock = doc.createElement("div");
                phoneblock.className = "model_new";
                phoneblock.style.background = Color;
                doc.getElementById("NextModelArea").appendChild(phoneblock);
            }
            //定义PC端和移动端模块再容器中的位置
            //取得方块的值
            var allPCblock = doc.getElementsByClassName("new_model"),
                allPhoneBlock = doc.getElementsByClassName("model_new");
            //遍历方块，放置方块的位置
            for (var i = 0; i < allPCblock.length; i++) {
                var singelPCblcok = allPCblock[i],
                    singelPhoneblock = allPhoneBlock[i],
                    blockModel = newModel[i],
                    step = STEP;
                singelPCblcok.style.top = blockModel.row * step + "px";
                singelPCblcok.style.left = blockModel.col * step + "px";
                singelPhoneblock.style.top = blockModel.row * 15 + "px";
                singelPhoneblock.style.left = blockModel.col * 15 + "px";
            }
            //清空没用的数值减少内存增加
            Color = null;
            step =null;
            singelPCblcok = null;
            singelPhoneblock=null;
            blockModel = null;
        }
        //判读屏幕分辨率
        function ScreenWidth() {
            //减少使用全局变量
            var doc = document;
            //根据屏幕分辨率同意样式
            if (screen.width >= 1200) {
                STEP = 40;
                ROW_COUNT = 18,
                    COL_COUNT = 10;
                var rect = doc.getElementById('container').getBoundingClientRect();
                doc.getElementById("Ranking").style.top = rect.bottom - 650 + "px";
                doc.getElementById("Ranking").style.left = rect.left + 30 + "px";
            } else if (screen.width < 450) {
                STEP = parseInt((screen.width - 135) / 9);
                var step = STEP
                doc.getElementsByClassName("screen")[0].style.height = (step * 16) + 30 + "px";
                doc.getElementsByClassName("screen")[0].style.width = step * 9 + 25 + "px";
                doc.getElementById("TouchArea").style.height = step * 16 + "px";
                doc.getElementById("TouchArea").style.width = step * 9 + "px";
                doc.getElementById("container").style.height = step * 16 + 3 + "px";
                doc.getElementById("container").style.width = step * 10 + "px";
                doc.getElementById("MiddleArea").style.top = (screen.height - 300) / 2 + "px";
                doc.getElementById("MiddleArea").style.left = (screen.width - 200) / 2 + "px";
                doc.getElementById("Ranking").style.top = (screen.height - 640) / 2 + "px";
                doc.getElementById("Ranking").style.left = (screen.width - 320) / 2 + "px";
                doc.getElementById("SettingContainer").style.top = (screen.height - 300) / 2 + "px";
                doc.getElementById("SettingContainer").style.left = (screen.width - 200) / 2 + "px";
            }
            //清空没用的数值减少内存增加
            step = null;
            rect = null;
        }
        //关卡动画
        function LevelAnimation(number) {
            //减少使用全局变量
            var doc = document;
            //添加动画
            doc.getElementById("LevelContainer").innerHTML = "<div class='level'id='levelnumber'>" + number + "</div>";
            doc.getElementById("levelnumber").style.top =(STEP *16 - 60)/2+"px";
            doc.getElementById("levelnumber").style.left=(STEP *9 - 100)/2+"px";
            setTimeout("document.getElementsByClassName('level')[0].style.visibility = 'hidden',document.getElementsByClassName('level')[0].style.opacity = '0'", 1000);
        }
        //播放滑动音乐
        function playmusic(music) {
            if(MusicPlay == true){
                if(music == 'move'){
                    var audio = new Audio("./assert/move.mp3");
                    audio.play();
                }else if(music == 'clear'){
                    var audio = new Audio("./assert/clear.mp3");
                    audio.play();
                }else{
                    var audio = new Audio("./assert/all.mp3");
                    audio.play();
                }
            }
            //清空没用的数值减少内存增加
            audio =null;
        }
        //加分动画
        function BounsPoint(Point) {
            document.getElementById("PointContainer").innerHTML = "<div class='Point'>+" + Point + "</div>";
            setTimeout("document.getElementsByClassName('Point')[0].style.visibility = 'hidden',document.getElementsByClassName('Point')[0].style.top = '310px',document.getElementsByClassName('Point')[0].style.opacity = '0'", 500);
        }
        //随机颜色
        function getColor() {
            var Arr = ["#ffb444", "#f16060", "#cc50ff", "#ff90ec", "#49ff49", "#79f7ce"];
            var n = Math.floor(Math.random() * Arr.length + 1) - 1;
            return Arr[n];
        }
        //创建模型
        function Create() {
            //减少使用全局变量
            var doc = document;
            //如果游戏结束停止创建
            if (isGameOver()) {
                gameOver();
                return;
            }
            //当前模块等于之前下一个模块的形状
            currentModel = newModel;
            //定义模块的初始位置
            currentX = -3;
            currentY = -3;
            //获取之前下一个模块的色彩
            var hue = color;
            //根据模块添加DIV到容器中
            for (var key in currentModel) {
                var NowModel = doc.createElement("div");
                NowModel.className = "activity_model";
                NowModel.style.background = hue;
                if(RotatePlay == true){
                    NowModel.style.transition =  'all 0.1s ease 0s';
                }
                if(screen.width <450) {
                    NowModel.style.width = STEP-3 +"px";
                    NowModel.style.height = STEP-3 +"px";
                }
                doc.getElementById("container").appendChild(NowModel);
            }
            //放置模块在容器中的位置
            locationmodel();
            //根据分数确定关卡和关卡速度
            if (mark < 500) {
                Speed = 1000;
                Level = '第一关';
                doc.getElementById("TopLevel").innerHTML = "";
                doc.getElementById("TopLevel").innerHTML = "1";
                if (LevelNumber < 2) {
                    LevelAnimation(Level);
                    LevelNumber += 1
                }
            } else if (mark >= 500 && mark < 1000) {
                Level = '第二关'
                Speed = 800;
                doc.getElementById("TopLevel").innerHTML = "";
                doc.getElementById("TopLevel").innerHTML = "2";
                if (LevelNumber >= 2 && LevelNumber < 3) {
                    LevelAnimation(Level);
                    LevelNumber += 1
                }
            } else if (mark >= 1000 && mark < 1500) {
                Level = '第三关'
                Speed = 700;
                doc.getElementById("TopLevel").innerHTML = "";
                doc.getElementById("TopLevel").innerHTML = "3";
                if (LevelNumber >= 3 && LevelNumber < 4) {
                    LevelAnimation(Level);
                    LevelNumber += 1
                }
            } else if (mark >= 1500 && mark < 2500) {
                Level = '第四关'
                Speed = 500;
                doc.getElementById("TopLevel").innerHTML = "";
                doc.getElementById("TopLevel").innerHTML = "4";
                if (LevelNumber >= 4 && LevelNumber < 5) {
                    LevelAnimation(Level);
                    LevelNumber += 1
                }
            } else if (mark >= 2500 && mark < 3500) {
                Level = '第五关'
                Speed = 300;
                doc.getElementById("TopLevel").innerHTML = "";
                doc.getElementById("TopLevel").innerHTML = "5";
                if (LevelNumber >= 5 && LevelNumber < 6) {
                    LevelAnimation(Level);
                    LevelNumber += 1
                }
            } else if (mark >= 3500 && mark < 5000) {
                Level = '第六关'
                Speed = 200;
                doc.getElementById("TopLevel").innerHTML = "";
                doc.getElementById("TopLevel").innerHTML = "6";
                if (LevelNumber >= 6 && LevelNumber < 7) {
                    LevelAnimation(Level);
                    LevelNumber += 1
                }
            } else {
                Level = '无敌关'
                Speed = 10;
                doc.getElementById("TopLevel").innerHTML = "";
                doc.getElementById("TopLevel").innerHTML = "7" ;
                if (LevelNumber >= 7 && LevelNumber < 8) {
                    LevelAnimation(Level);
                    LevelNumber += 1
                }
            }
            //使模块自动下落
            autoDown(Speed);
            //去掉下一个模块之前的值
            removenew();
            //新建洗一个模组新的值
            NextModel();
            //清空没用的数值减少内存增加
            hue = null;
        }
        //定义位置
        function locationmodel() {
            //检查是否触碰边界
            CheckBoundary();
            //获取模块
            var Allblcok = document.getElementsByClassName("activity_model");
            //确定模块的位置
            for (var i = 0; i < Allblcok.length; i++) {
                var singelblock = Allblcok[i],
                    blockModel = currentModel[i],
                    step = STEP;
                singelblock.style.top = (currentY + blockModel.row) * step + "px";
                singelblock.style.left = (currentX + blockModel.col) * step + "px";
            }
            //清空没用的数值减少内存增加
            Allblcok = null;
            singelblock = null;
            blockModel =null;
            step =null;
        }
        //移动小方块
        function move(x, y) {
            var oldX = currentX;
            //右移动的时候触发
            if (x > 1) {
                for (var i = 1; i < x; i++) {
                    //判断是否触碰固定模型
                    if (isMeet(currentX + i, currentY + y, currentModel)) {
                        //底部的触碰发生在移动16宫格的时候，并且此次移动是因为Y轴的变化而引起的
                        if (y !== 0) {
                            // 模型之间底部发生触碰固定模型
                            fixblocks();
                        }
                        return;
                    }
                    //移动模型
                    currentX++;
                    //确定模型位置
                    locationmodel();
                }
            }
            else {
                //向左移动时判断是否触碰固定模型
                if (isMeet(currentX + x, currentY + y, currentModel)) {
                    //底部的触碰发生在移动16宫格的时候，并且此次移动是因为Y轴的变化而引起的
                    if (y !== 0) {
                        // 模型之间底部发生触碰
                        fixblocks();
                    }
                    return;
                }
            }
            //控制块元素移动
            currentX += x;
            currentY += y;
            //确定模型位置
            locationmodel();
            if(oldX!=currentX )
            {
                playmusic("move");
            }
            //清空没用的数值减少内存增加
            oldX = null;
        }
        //按钮确认
        function onKeyDown() {
            document.onkeydown = function (event) {
                switch (event.keyCode) {
                    //按上键旋转模块
                    case 38:
                        rotate();
                        break;
                    //按右键向右移动模块
                    case 39:
                        move(1, 0);
                        break;
                    //按下键模块加速下滑
                    case 40:
                        autoDown(35);
                        break;
                    //按左键向左移动模块
                    case 37:
                        move(-1, 0);
                        break;
                }
            }
        }
        //旋转
        function rotate() {
            //判断是否为正方形
            if(currentModel == MoDELS[2]){
                return;
            }
            //克隆模型原先模型
            var cloneCurrentModel = _.cloneDeep(currentModel)
            //旋转算法改变模型
            for (var key in cloneCurrentModel) {
                var abc = cloneCurrentModel[key];
                var temp = abc.row;
                abc.row = abc.col;
                abc.col = 3 - temp;

            }
            //判断旋转时是否触碰固定模型或者触底
            if (isMeet(currentX, currentY, cloneCurrentModel)) {
                return;
            }
            //接受了这次旋转
            currentModel = cloneCurrentModel;
            //确定模型位置
            locationmodel();
            //清空没用的数值减少内存增加
            cloneCurrentModel = null;
            abc = null;
            temp = null;
        }
        //检查边界
        function CheckBoundary() {
            //模型可移动边界
            var leftBound = 0,
                rightBound = COL_COUNT,
                bottomBound = ROW_COUNT;
            //遍历模型是否触碰边界
            for (var key in currentModel) {
                var SingelBlock = currentModel[key]
                if ((SingelBlock.col + currentX) < leftBound) {
                    currentX++;
                } else if ((SingelBlock.col + currentX) >= rightBound) {
                    currentX--;
                } else if ((SingelBlock.row + currentY) >= bottomBound) {
                    currentY--;
                    fixblocks();
                }
            }
            //清空没用的数值减少内存增加
            rightBound =null;
            bottomBound =null;
        }
        //固定底部方块
        function fixblocks() {
            //获取移动的模型
            var fix = document.getElementsByClassName("activity_model")
            //遍历模型更改为固定样式
            for (var i = fix.length - 1; i >= 0; i--) {
                var fixblock = fix[i]
                fixblock.className = "fixed_model"
                var block = currentModel[i]
                //记录固定模型的位置
                fixedBlocks[(currentY + block.row) + "_" + (currentX + block.col)] = fixblock;
            }
            //判断是否满一行
            isRemoveLine();
            //创建下一个模型到容器中
            Create();
            //清空没用的数值减少内存增加
            block = null;
            fix= null;
            fixblock = null;
        }
        //判断是否触碰
        function isMeet(x, y, model) {
            //判断模型是否触碰固定模型
            for (var key in model) {
                var block = model[key]
                if (fixedBlocks[(y + block.row) + "_" + (x + block.col)]) {
                    return true;
                }
            }
            //清空没用的数值减少内存增加
            block =null;
            return false;
        }
        //清除下一个模型
        function removenew() {
            //减少使用全局变量
            var doc = document,
            //清空提示栏的模型
                Nextblock = doc.getElementById("next_block"),
                Nextmodelarea = doc.getElementById("NextModelArea");
                Nextblock.innerHTML = "";
                Nextmodelarea.innerHTML = "";
        }
        //检测行是否铺满
        function isRemoveLine() {
            //在一行中，每一列都存在块元素，那么该行就需要被消除
            //遍历所有行中的所有列
            //遍历所有行
            var FIXEDBLOCKS = fixedBlocks
            for (var i = 0; i < ROW_COUNT; i++) {
                //编辑夫，假设当前行已经被铺满
                var flag = true
                //遍历当前行中的所有列
                for (var j = 0; j < COL_COUNT; j++) {
                    //如果当前行中右一列没有数据，那么就说明当前行没有被铺满
                    if (!FIXEDBLOCKS[i + "_" + j]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    //该行已经被铺满了
                    BounsPoints += 100;
                    addPoint();
                    removeLine(i);
                }
            }
            if (BounsPoints > 0) {
                BounsPoint(BounsPoints);
                BounsPoints = 0;
            } else {
                playmusic('clear');
            }
            //清空没用的数值减少内存增加
            FIXEDBLOCKS =null;
        }
        //删除行
        function removeLine(line) {
            //1.删除该行中所有的块元素
            //2.删除该行中所有块元素的数据源
            //遍历该行中的所有列
            for (var i = 0; i < COL_COUNT; i++) {
                fixedBlocks[line + "_" + i].style.height = 0 + "px";
                document.getElementById("container").removeChild(fixedBlocks[line + "_" + i]);
                fixedBlocks[line + "_" + i] = null;
            }
            downLine(line);
            playmusic('all');
        }
        function downLine(line) {
            //1.被清理行之上的所有块元素数据源所在的行书+1
            //2.让块元素在容器中的位置下落
            //3.清理掉之前的块元素
            //遍历被清理行之上的所有行
            for (var i = line - 1; i >= 0; i--) {
                //该行中的所有列
                for (var j = 0; j < COL_COUNT; j++) {
                    if (!fixedBlocks[i + "_" + j]) continue;
                    //存在数据
                    //1.被清理行之上的所有块元素数据源所在的行数 +1
                    fixedBlocks[(i + 1) + "_" + j] = fixedBlocks[i + "_" + j];
                    var step =STEP;
                    //2.让块元素在容器中的位置下落一行
                    fixedBlocks[(i + 1) + "_" + j].style.top = (i + 1) * step + "px";
                    //3.清理掉之前的块元素
                    fixedBlocks[i + "_" + j] = null;
                }
            }
            //清空没用的数值减少内存增加
            step = null;
        }
        // 让模型自动下落
        function autoDown(x) {
            if (mInterval) {
                clearInterval(mInterval);
            }
            mInterval = setInterval(function () {
                move(0, 1)
            }, x)
        }

        //判断游戏结束
        function isGameOver() {
            //当第0行存在块元素的时候就代表游戏结束了
            for (var i = 0; i < COL_COUNT; i++) {
                if (fixedBlocks["0_" + i]) {
                    return true;
                }
            }
            return false;
        }
        //冒泡排序
        function sort(arr) {
            for (var i = 0; i < arr.length - 1; i++) {
                for (var j = 0; j < arr.length - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {// 相邻元素两两对比
                        var hand = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = hand;
                    }
                }
            }
            return arr;
        }
        //二分法排序
        function binaryInsertSort(arr) {
            for (var i = 1; i < arr.length; i++) {
                var key = arr[i], left = 0, right = i - 1;
                while (left <= right) {
                    var middle = parseInt((left + right) / 2);
                    if (key < arr[middle]) {
                        right = middle - 1;
                    } else {
                        left = middle + 1;
                    }
                }
                for (var j = i - 1; j >= left; j--) {
                    arr[j + 1] = arr[j];
                }
                arr[left] = key;
            }
            return arr;
        }
        //结束掉游戏
        function gameOver() {
            //减少使用全局变量
            var doc = document;
            //1.停止定时器
            if (mInterval) {
                Game = false;
                clearInterval(mInterval);
            }
            //2.弹出对话框
            //获取本地缓存
            Ranking = localStorage.getItem("Ranking");
            Ranking = null ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : Ranking.split(',');
            Ranking = JSON.parse('[' + String(Ranking) + ']')
            for (var i = 0; i < Ranking.length; i++) {
                //比较是否入榜
                if(mark > Ranking[i]) {
                    //入榜改变缓存
                    Ranking.pop();
                    Ranking.push(mark);
                    var wee = sort(Ranking),
                    //var twoRanking = sort(Ranking).reverse();
                        NewRanking = binaryInsertSort(Ranking).reverse(),
                        allranking =doc.getElementById("AllRanking");
                    localStorage.setItem("Ranking", NewRanking);
                    //清空排行榜
                    doc.getElementById("AllRanking").innerHTML = "";
                    //加入排行榜
                    for (var j = 0; j < NewRanking.length; j++) {
                        var nowj = j + 1;
                        if(j == 0){
                            var singleRanking = doc.createElement("li");
                            singleRanking.innerHTML = '<div>🥇</div>' + NewRanking[j];
                            allranking.append(singleRanking);
                        }else if(j == 1){
                            var singleRanking = doc.createElement("li");
                            singleRanking.innerHTML = '<div>🥈</div>' + NewRanking[j];
                            allranking.append(singleRanking);
                        }else if(j == 2){
                            var singleRanking = doc.createElement("li");
                            singleRanking.innerHTML = '<div>🥉</div>' + NewRanking[j];
                            allranking.append(singleRanking);
                        }else {
                            var singleRanking = doc.createElement("li");
                            singleRanking.innerHTML = '<div>'+nowj+'</div>' + NewRanking[j];
                            allranking.append(singleRanking);
                        }
                    }
                    //如果获得第一名
                    if (mark == NewRanking[0]) {
                        //增加结果和修改最高分
                        doc.getElementById("result").innerHTML = "";
                        doc.getElementById("result").innerHTML = "恭喜你获得👑";
                        doc.getElementById("MaxMark").innerHTML = "👑 " + mark;
                        doc.getElementById("PhoneMaxmark").innerHTML = mark;
                        //显示容器
                        if (screen.width < 450) {
                            doc.getElementById("MiddleArea").style.display = "inline";
                        } else {
                            alert("恭喜你获得👑");
                        }
                    } else if (mark == NewRanking[1]) {
                        //增加结果和修改最高分
                        doc.getElementById("result").innerHTML = "";
                        doc.getElementById("result").innerHTML = "恭喜你获得第二名";
                        //显示容器
                        if (screen.width < 450) {
                            doc.getElementById("MiddleArea").style.display = "inline";
                        } else {
                            alert("恭喜你获得第二名");
                        }
                    } else if (mark == NewRanking[2]) {
                        //增加结果和修改最高分
                        doc.getElementById("result").innerHTML = "";
                        doc.getElementById("result").innerHTML = "恭喜你获得第三名";
                        //显示容器
                        if (screen.width < 450) {
                            doc.getElementById("MiddleArea").style.display = "inline";
                        } else {
                            alert("恭喜你获得第三名");
                        }
                    } else {//进入榜单没有获得第一名
                        //增加结果
                        doc.getElementById("result").innerHTML = "";
                        doc.getElementById("result").innerHTML = "恭喜你进入了排行榜";
                        //显示容器
                        if (screen.width < 450) {
                            doc.getElementById("MiddleArea").style.display = "inline";
                        } else {
                            alert("恭喜你进入了排行榜");
                        }
                    }
                    break;
                } else {
                    //记录循环值
                    Number++;
                    //全部循环完毕
                    if (Number == 9) {
                        //增加结果提示
                        doc.getElementById("result").innerHTML = "";
                        doc.getElementById("result").innerHTML = "很遗憾未能入榜，加油哦";
                        //清空给循环值
                        Number == 0;
                        //显示容器
                        if (screen.width < 450) {
                            doc.getElementById("MiddleArea").style.display = "inline";
                        } else {
                            alert("很遗憾你没有入榜");
                        }
                        break;
                    }
                }
            }
            //清空没用的数值减少内存增加
            wee = null;
            NewRanking =null;
        }
        //加分
        function addPoint() {
            //减少使用全局变量
            var doc = document;
            //添加分数修改原分数
            mark += 100;
            doc.getElementById("PCmark").innerHTML = "";
            doc.getElementById("PCmark").innerHTML = "🌟  " + mark;
            doc.getElementById("Phonemark").innerHTML = "";
            doc.getElementById("Phonemark").innerHTML = mark;
        }
        //读取最高分
        function BestScore() {
            //减少使用全局变量
            var doc = document;
            //读取最高分
            var allRanking =doc.getElementById("AllRanking");
            allRanking.innerHTML = "";
            NewScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            maxScore = localStorage.getItem("Ranking");
            maxScore = maxScore == null ? NewScore : maxScore.split(',');
            doc.getElementById("MaxMark").innerHTML = "👑 " + maxScore[0];
            doc.getElementById("PhoneMaxmark").innerHTML = maxScore[0];
            for (var j = 0; j < maxScore.length; j++) {
                var nowj = j + 1;
                if(j == 0){
                    var singleRanking = doc.createElement("li");
                    singleRanking.innerHTML = '<div>🥇</div>' + maxScore[j];
                    allRanking.append(singleRanking);
                }else if(j == 1){
                    var singleRanking = doc.createElement("li");
                    singleRanking.innerHTML = '<div>🥈</div>' + maxScore[j];
                    allRanking.append(singleRanking);
                }else if(j == 2){
                    var singleRanking = doc.createElement("li");
                    singleRanking.innerHTML = '<div>🥉</div>' + maxScore[j];
                    allRanking.append(singleRanking);
                }else {
                    var singleRanking = doc.createElement("li");
                    singleRanking.innerHTML = '<div>'+nowj+'</div>' + maxScore[j];
                    allRanking.append(singleRanking);
                }
            }
        }
        //读取设置
        function StartSetting(){
            MusicPlay = localStorage.getItem("MusicPlay") === "false" ? true :false;
            if(MusicPlay == null){
                MusicPlay =false;
            }else{
                SettingMusic();
                
            }
            RotatePlay = localStorage.getItem("RotatePlay") === "false" ? true :false;
            if(RotatePlay == null){
                RotatePlay =false;
            }else{
                Settingrotate();
            }
        }
        //刷新页面
        function flush() {
            window.location.reload();
        }
        //排行榜显示隐藏
        function RankingDisplay(activity) {
            if (activity == 'none') {
                if (Game == true) {
                    autoDown(Speed);
                } else {
                    clearInterval(mInterval);
                }
            } else {
                clearInterval(mInterval);
            }
            document.getElementById("RankingArea").style.display = activity;
        }
        //设置显示隐藏
        function SettingDisplay(activity) {
            if (activity == 'none') {
                if (Game == true) {
                    autoDown(Speed);
                } else {
                    clearInterval(mInterval);
                }
            } else {
                clearInterval(mInterval);
            }
            document.getElementById("SettingArea").style.display = activity;
        }
        //设置音效
        function SettingMusic(){
            if(MusicPlay == false){
                MusicPlay= true;
                localStorage.setItem("MusicPlay", MusicPlay);
                document.getElementById("SettingMusic").innerText = '✔';
            }else if(MusicPlay == true) {
                MusicPlay= false;
                localStorage.setItem("MusicPlay", MusicPlay);
                document.getElementById("SettingMusic").innerHTML = '';
            }
        }
        //设置旋转
        function Settingrotate() {
            //获取模块
            var Allblcok = document.getElementsByClassName("activity_model");
            //确定模块的位置
            if(RotatePlay == false){
                RotatePlay= true;
                document.getElementById("SettingRotate").innerText = '✔';
                localStorage.setItem("RotatePlay", RotatePlay);
                for (var i = 0; i < Allblcok.length; i++) {
                    var singelblock = Allblcok[i];
                    singelblock.style.transition='all 0.1s ease 0s';
                }
            }else if(RotatePlay == true) {
                RotatePlay= false;
                document.getElementById("SettingRotate").innerHTML = '';
                localStorage.setItem("RotatePlay", RotatePlay);
                for (var i = 0; i < Allblcok.length; i++) {
                    var singelblock = Allblcok[i];
                    singelblock.style.transition='none';
                }
            }
            //清空没用的数值减少内存增加
            singelblock =null;
        }
        //手指触碰
        function onTouch() {
            document.getElementById("TouchArea").addEventListener("touchstart", function (e) {
                e.preventDefault();
                startX = e.changedTouches[0].pageX,
                    startY = e.changedTouches[0].pageY;
                oldX = currentX;
                oldY = currentY;

            });
            document.getElementById("TouchArea").addEventListener("touchend", function (e) {
                e.preventDefault();
                EndX = e.changedTouches[0].pageX,
                    EndY = e.changedTouches[0].pageY;
                if (EndX - startX == 0) {
                    rotate();
                }
            });
            document.getElementById("TouchArea").addEventListener("touchmove", function (e) {
                e.preventDefault();
                moveEndX = e.changedTouches[0].pageX;
                moveEndY = e.changedTouches[0].pageY;
                thex = Math.abs(moveEndX - startX);
                they = Math.abs(moveEndY - startY);

                if (thex > they) {
                    var d = moveEndX - startX;
                    var n = parseInt(d / STEP);
                    var targetX = oldX + n;
                    if (targetX > COL_COUNT) {
                        //targetX = COL_COUNT;
                    }

                    if (targetX < -2) {
                        //targetX = -2;
                    }
                    if (targetX != currentX) {
                        if (targetX > currentX) {
                            nowx = targetX - currentX;
                            for (var i = 0; i < nowx; i++) {
                                move(1, 0);
                            }
                        }
                        else {
                            nowx = currentX - targetX;
                            for (var i = 0; i < nowx; i++) {
                                move(-1, 0);
                            }
                        }
                    }

                }
                else if (thex < they) {
                    var d = moveEndY - startY;
                    if (d > 40) {
                        autoDown(35);
                    }
                }
            })
            d=null;
            n=null;
        }