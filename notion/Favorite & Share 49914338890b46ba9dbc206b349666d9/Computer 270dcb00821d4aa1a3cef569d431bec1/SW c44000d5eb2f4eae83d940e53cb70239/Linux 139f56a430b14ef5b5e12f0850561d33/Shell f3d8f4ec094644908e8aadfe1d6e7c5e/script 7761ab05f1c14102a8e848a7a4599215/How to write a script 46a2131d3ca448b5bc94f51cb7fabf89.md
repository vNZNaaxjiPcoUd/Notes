# How to write a script

shell gramma

[https://blog.twtnn.com/2013/12/shell-script.html](https://blog.twtnn.com/2013/12/shell-script.html)[http://linux.vbird.org/linux_basic/0340bashshell-scripts.php](http://linux.vbird.org/linux_basic/0340bashshell-scripts.php)

指令，
而把這些指令存被在文字檔中，再交由Shell執行，就是Script。
一般會將Shell [Script的副檔名命名為.sh](http://xn--script-g43j00ia33ii23n0opkxr.sh/)，雖然副檔名在Linux中並非必要，
但是有副檔名可以讓我們更容易管理這些檔案。

[假設有一個名為test.sh](http://xn--test-k84f91i7ll3ww89b7iup57d.sh/) 的 Shell Script，首先用文字編輯器來撰寫內容如下：
#!/bin/bash
echo Hello World

第一行是必需的，它是用來定義你要使用的 shell。Linux中有許多的Shell可以使用，
如：ksh、bash，但是彼此之間語法有所差異，所以我們首先需要定義使用哪一個Shell。
而第二行的 echo 代表列出一個字串，預設會把後面的字串「Hello World」顯示在螢幕上。
將test.sh存檔後，可以用下列其中一種方式執行它：
1、直接輸入 sh [test.sh](http://test.sh/)
2、改變test.sh的權限，加上可以執行的權限，
chmod a+x [test.sh](http://test.sh/)
接著直接執行它：
./test.sh

在Shell Script中，「#」表示註解，在#後面將視為註解並且被程式忽略。
例如：
#pwd
ls -l
Shell只會執行ls -l，而不會執行ls -l

而「;」 則代表指令的分隔，例如：
pwd;ls -l
和
pwd
ls -l
都是一樣執行pwd及ls -l。

二、變數的使用
在Shell Script中，所有的變數都視為字串，因此不需要在定義變數類型。
在Shell中定義和使用變數時並不一樣。
例如，定義一個變數id並且設定值為2013001，接著還要將印出變數的值：
id=2013001 -> 定義變數時前面不加「$」符號
echo $id   -> 使用變數時前面要加「$」符號
注意，在等號的二邊不可以有空白，否則將出現錯誤。

再介紹一個範例：
dir=/home/oracle
ls $dir

這裡我們定義了變數dir的值為/home/oracle，接著用ls指令來印出變數dir，
此時指令會變為ls /home/oracle，所以就把目錄中所有檔案都列出來。

我們再來看一個例子，說明如何使用變數來定義變數：
$ tmppath=/tmp$ tmpfile=$tmppath/abc.txt$ echo $tmpfile
/tmp/abc.txt

我們也可以把指令的輸出傳回給變數，指令前後加上關鍵字「`」， 它是位於鍵盤左上角「數字鍵1」左邊的按鍵： now=`date`
echo now
結果會秀出「Mon Dec 16 09:31:44 EAT 2013」

此外，雙引號與單引號字串對變數解釋有不同的意義，
如果是使用單引號，則變數會當成一般文字；雙引號才會解譯成變數，例如：
a=123
echo "$a" ->結果是123
echo '$a' ->結果是$a

Script也可以要求使用者輸入資料，利用read指令來讀取輸入的資料。如下：
#!/bin/sh
printf "Please input your name:"
read Name
echo "Your name is $Name"

由於echo指令內定會自動換行，所以我們使用printf這個指令來輸出字串。
[我們將上述內容存成檔案test01.sh](http://xn--test01-9o7il2l8vdf19aq4ax0a878cha689u1miiz9n.sh/)，接著執行它：
[root@oel62 test]# sh [test01.sh](http://test01.sh/)
Please input your name: Job ->提示要輸入名字，此時輸入的是Job
Your name is Job

Shell Script有一些預設的特殊變數如下：
$? ：表示上一個指令的離開狀況，一般指令正常離開會傳回 0。不正常離開則會傳回 1、2 等數值。
$1 ：表示輸入的第一個參數，$2 則為第二個參數，依此類推。
$0 ：shell script的檔名。
$@ ：即代表 $1, $2,....直到所有參數結束。也就是說 $@ 代表了 "$1" "$2" "$3"....。
$* ：所有參數無間隔的連在一起，成為單一個參數。也就是說 $* 代表了 "$1 $2 $3..."

三、運算符號
在 shell 中的四則運算必須使用 expr 這個指令來輔助。注意，在 + - * / 的二邊都有空白，如果沒有空白將產生錯誤：
expr 6 - 2
sum=`expr 10 + 20`
echo $sum
結果：
4
30

還有要特別注意的是乘號 * 。因為 * 有其他意義，所以要使用 \* 來代表。另外，也可以用 % 來求餘數。
count=`expr 9 \\* 3`
echo $count
echo `expr $count % 3`
結果：
27
0

簡單的條件判斷是以 && 及 || 這二個符號來表示。
a && b如果 a 是真，則執行 b。如果 a 是假，則不執行 b。
a || b如果 a 是假，則執行 b。如果 a 是真，則不執行 b。
例如：
ls /home && echo YES
ls /dev/aaaa && echo YES
結果：
YES
ls: /dev/aaaa: No such file or directory

接著我們使用 test 及 [ 來做運算，運算所傳回的結果是真 (true) 或假 ( false)。
我們可以將它應用在條件判斷上。test 和 [ 都是一個指令，我們可以使用 test 並在其後加上參數來判斷真假。
或者也可以使用 [ 表達式 ] 來替代 test，要注意的是 [ ] 中的必須有空白間隔。

表達式說明如下：
-n str1      ：如果字串 str1 的長度大於 0 則傳回 true。
-z str1      ：如果字串 str1 的長度等於 0 則傳回 true。
str1  = str2 ：如果字串str1等於字串str2則傳回 true，等號二邊有空白。
str1 != str2 ：如果 str1 不等於 str2 則傳回 true。!= 的二邊有空白。
a -eq b      ：Equal，a 等於 b 則傳回真 (true)。
a -ne b      ：Not equal，a 不等於 b 則傳回真 (true)。
a -gt b      ：Grwater than，a 大於 b 則傳回真 (true)。
a -lt b      ：Less Than，a 小於 b 則傳回真 (true)。
a -ge b      ：Greater or equal，a 大於或等於 b 則傳回真 (true)。
a -le b      ：Less or equal，a 小於或等於 b 則傳回真 (true)。

我們舉例來說明：
test 5 -eq 5 && echo true
test abc!=cde && echo true
[ 6 -lt 10 ] && echo true
結果：
true
true
true

四、流程控制
1、if 的條件判斷
基本語法：
if condition-list
then list
elif condition-list
then list
else list
fi

範例：
if [ $1 = "aa" ]
then
echo "YES"
else
echo "NO"
fi

範例二：
$ ee [test.sh](http://test.sh/)
#!/bin/sh
if [ $1 -gt 10 ]
then echo " $1 is bigger then 10"
elif [ $1 -ge 0 ]
then echo " $1 is between 5 and 0. "
else echo "$1 is less then 0."
fi

2、while 及 until 迴圈
基本語法：
while condition-list
do list
done

until condition-list
do list
done
範例一：
#!/bin/sh
i=1
while [ $i -le 10 ]
do
echo $i
i=`expr $i + 1`
done
說明：首先令變數 i=1，接著在當i小於等於10執行迴圈的內容，而每次執行迴圈一次，則i加1。

範例二：
#!/bin/sh
i=1
until [ $i -gt 10 ]
do
echo $i
i=`expr $i + 1`
done

說明：首先令變數 i=1，接著迴圈會判斷，一直執行到i大於10才停止。
每跑一次迴圈就i就加1。

3、for 迴圈
基本語法：
for name in word1 word2 …
do do-list
done

for name
do do-list
done

範例一：
#!/bin/sh
for color_name in blue red green
do
echo $color_name
done

說明：這個Script中，會在每一次迴圈中將關鍵字in後面的字串分配給變數color_name，
然後印出變數 color。

4、case 判斷
基本語法：
case word in
pattern1) list1 ;;
pattern2) list2 ;;
…
esac

範例：
case $num1 in
1|2|3)       echo $num1 is between 0~3;;
4|5|6|7)       echo $num1 is between 4~7;;
8|9)           echo $num1 is 8 or 9;;
*)             echo $num1 is not on the list;;
esac

6、函式的運用
Shell Script中也可以使用函式 (function) 來將程式模組化。
基本語法：
name ( )
{
statement
}

函式有幾個要注意的地方：
A、在使用函式之前一定要先定義它，也就是在一個 Shell Script 中，一定要先寫函式的內容，
在函式之後再寫一般的程式部份。
B、在Script中的變數全部都是全域變數 (Global)，所以函式中的變數會影響函式之外的其他部份。
C、在命令列中輸入的參數是以 $1,$2來讀取，但是這些參數並沒有辦法在函式中使用。
傳給函式的方法和在命令列中一樣，例如：[函式名稱] arg1 arg2..。
傳進函式的變數一樣會以 $1,$2來儲存並使用。

範例：
addnum1 ( )
{
echo 'Function $1 is' $1
echo 'Function $2 is' $2
}

echo 'Command $1 is' $1
echo 'Command $2 is' $2

a=`expr $1 + 10`
b=`expr $2 + 10`
addnum1 $a $b

程式執行：
[root@oel62 test]# ./test01.sh 2 3
結果：
Command $1 is 2
Command $2 is 3
Function $1 is 12
Function $2 is 13