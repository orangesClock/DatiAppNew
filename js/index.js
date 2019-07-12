var tikuList = [];
var currentTimu = {};
var score = 0;
var isChoose = false;
var num = 10

//ajax获取题目内容
$.get("dati.json",function(res){
	console.log(res)
	tikuList = res
})


//点击开始答题按钮切换页面
$('.startBtn').click(function(e){
	$('.gaming').addClass("active")
	$('.startGame').removeClass('active')
	randomRender()
})


function randomRender(){
	var randomIndex = parseInt(Math.random()*tikuList.length);
	currentTimu =  tikuList.splice(randomIndex,1)[0];
	console.log(currentTimu);
	$('.timu').html(currentTimu.quiz)
	$(".options").html("");
	currentTimu.options.forEach(function(item,index){
		$(".options").append(`<div data-index="${index}">${index+1}. ${item}</div>`)
	})
	
}


$('.options').click(function(e){
	if(!isChoose){
		console.log(e)
		//获取索引值
		var index = parseInt(e.target.dataset.index) ;
		console.log(index+1)
		if(currentTimu.answer==(index+1)){
			score += 10;
			$('[data-index='+index+']').addClass("correct")
		}else{
			var correctIndex = currentTimu.answer -1;
			$('[data-index='+correctIndex+']').addClass("correct")
			$('[data-index='+index+']').addClass("error")
		}
		
		isChoose = true;
		
		num -- ;
		
		
		setTimeout(function(){
			if(num==0){
				$(".endGame").addClass("active")
				$('.score').html(score)
			}else{
				isChoose = false;
				randomRender()
			}

		},2000)
	}
	
	
	
})


//重新刷新页面即可重新答题
$('.reStart').click(function(){
	location.reload()
})
