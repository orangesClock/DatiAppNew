var datiContent=[]
var datiRandomNumber
var datiQuiz
var  optionDan
var answerIndex
var scole=0
var flag=false
var num=20
var datiContentText
var t

$.get("quizzes.json",function (res) {
    datiContent = res
    console.log(res)
})



function render(){
    clearTimeout(t)

    datiRandomNumber =parseInt(Math.random()*(datiContent.length))
    datiContentText=datiContent.splice(datiRandomNumber,1)[0]
    // console.log(datiContent[datiRandomNumber])
    datiQuiz=datiContentText.quiz
    optionDan=datiContentText.options
    answerIndex=datiContentText.answer

    $(".gaming").addClass("active")
    $(".timu").html(datiQuiz)

    optionDan.forEach(function (item,index) {
        $(".options").append(
            `
    <div data-index="${index}">${index+1}. ${item}</div>
    `)
    })

    t=setTimeout(function (e) {
        num--
        if(num==0){
            $(".endGame").addClass("active")
            $(".score").html(scole*5)
        }else{
            $(".options").html("")
            render();
            flag=false
        }
    },10000)

}

$(".startBtn").click(function (e) {
    render()
})

$(".options").click(function (e) {
    if(!flag){
        var index=parseInt(e.target.dataset.index)
        if(index==answerIndex-1){
            scole++
            $('[data-index='+index+']').addClass("correct")
        }else{
            $('[data-index='+(answerIndex-1)+']').addClass("correct")
            $('[data-index='+index+']').addClass("error")
        }
        num--
        flag=true

            setTimeout(function (e) {
                if(num==0){
                    $(".endGame").addClass("active")
                    $(".score").html(scole*5)

                }else{
                    $(".options").html("")
                    render();
                    flag=false
                }
            },1000)
        }
})


$(".reStart").click(function (e) {
    location.reload()
})















