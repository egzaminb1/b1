import { catC} from "../../exercises/AllCatDef"
import { QuizC1_1 } from "../../exercises/quizCatC/QuizC1_1"
import { AC_BOLD_CLASS_C1, AC_BOLD_CLASS_C2, AC_BOLD_CLASS_C7, AC_CHECK_C1, AC_CHECK_C2, AC_CHECK_C3, AC_CHECK_C5, AC_CHECK_C7, AC_CLEAR_STATE_C, AC_HINT_MODE_C, AC_INP_ANSW_C3, AC_NEXT_C, AC_PREV_C, AC_SAVE_NUMQUESTION_C, AC_SAVE_SUBCAT_C } from "../actions/actionTypes"

const initialState={
    cat:catC,
    currentQuiz:{...QuizC1_1},
    selectSubCat:0,
    numQuestion:0,
    hintMode:false,
    lengthSubCat:catC.subCat.length,
    lengthQuestions:catC.subCat[0].quizes.length,
    isChecked:false,

    timerOfComponent:0,
    curRightPoints:0,
    curAllPoints:0,
    arrStatistic:[]
}

export const  QuizCatCReducer=(state=initialState, action)=>{
    let numQuestion=state.numQuestion
   let selectSubCat=state.selectSubCat
   let lengthQuestions=state.cat.subCat[selectSubCat].quizes.length 
   let lengthSubCat=state.lengthSubCat
   let currentQuiz=state.cat.subCat[selectSubCat].quizes[numQuestion]
   let newState={...state}
   let rightAnswers=0
   let pointForAnswer=0
    let curRightPoints=0
    let statistic={}
    let quantity=0
    let catHeader=state.cat.catHeader
    let headQuiz=state.cat.subCat[selectSubCat].headQuiz[0]

    const currentQuizFunc=(currentQuiz=state.currentQuiz, selectSubCat=state.selectSubCat)=>{
        //  debugger
        let curQuiz={...currentQuiz}
        if(selectSubCat===0){
            // curQuiz={...currentQuiz}
            curQuiz.card=[...currentQuiz.card]
            curQuiz.card.map((nCard,i)=>{
                curQuiz.card[i]={...nCard}
                curQuiz.card[i].p=[...nCard.p]
                curQuiz.card[i].p.map((str,n)=>{
                    curQuiz.card[i].p[n]={...str}
                    return(n)
                    })
                return(i)
                })
            return curQuiz
        }else if(selectSubCat===1){
            // curQuiz={...currentQuiz}
            if(!curQuiz.arrAnswer){
                curQuiz.answer=[...currentQuiz.answer]
                let arrAnswer=curQuiz.answer.map((item,i)=>{
                    let arrWords=item.map((word, n)=>{
                        if(word.split('').includes('*')){
                            let nWord=word.split('')
                            nWord.pop()
                            return {word:nWord.join(''), cls:'', answ:true}
                        }else return {word, cls:'', answ:false}
                    })
                    return arrWords
                })
                // return {...curQuiz, arrAnswer}
                curQuiz.arrAnswer=arrAnswer
            }else {
                // debugger
                curQuiz.arrAnswer=[...currentQuiz.arrAnswer]
                let arrGroupWords=curQuiz.arrAnswer.map((item,i)=>{
                    let newItem=item.map((str,n)=>{
                        return {...str}
                    })
                    return newItem
                })
                // console.log(arrGroupWords)
                curQuiz.arrAnswer=arrGroupWords
            }
            return curQuiz
        }else if(selectSubCat===2 || selectSubCat===3 || selectSubCat===4 || selectSubCat===5){
            // curQuiz={...currentQuiz}
            if(!curQuiz.arrAnswer){
                // curQuiz.answer=[...currentQuiz.answer]
                let arrAnswer=curQuiz.answer.map((item,i)=>{
                    // return ''
                 return {inpWord:'', cls:'', answ:item}
                })
                curQuiz.arrAnswer=arrAnswer
            }else {
                curQuiz.arrAnswer=[...currentQuiz.arrAnswer]
                curQuiz.arrAnswer.map((item, i)=>{
                    curQuiz.arrAnswer[i]={...item}
                    return(i)
                })
            }
            return curQuiz
        }else if(selectSubCat===6){
            curQuiz={...currentQuiz}
           if(!currentQuiz.arrRows){
            let arrRows=curQuiz.rows.map((item, i)=>{
                let arrRows={clause:item[0], clsP:'', clsF:'', answ:item[1]}
                 return(arrRows)
             })
             curQuiz.arrRows=arrRows
           }else{
            curQuiz.arrRows=[...currentQuiz.arrRows]
            curQuiz.arrRows.map((item, i)=>{
                curQuiz.arrRows[i]={...item}
                return(i)
            })
           }
            return curQuiz
        }
    }

    switch(action.type){
        case AC_SAVE_SUBCAT_C:
            currentQuiz=state.cat.subCat[action.numSubCat].quizes[0]
            currentQuiz=currentQuizFunc(currentQuiz, action.numSubCat)
            lengthQuestions=state.cat.subCat[action.numSubCat].quizes.length 
            return(
            {...state, selectSubCat:action.numSubCat, numQuestion:0, isChecked:false, hintMode:false, lengthQuestions, currentQuiz})

        case AC_SAVE_NUMQUESTION_C:
             currentQuiz=state.cat.subCat[state.selectSubCat].quizes[action.numQuestion]
             currentQuiz=currentQuizFunc(currentQuiz)
            return(
            {...state, numQuestion:action.numQuestion, isChecked:false, hintMode:false, currentQuiz})

        case AC_NEXT_C:
            if(numQuestion+1>=lengthQuestions){
                if(selectSubCat+1<lengthSubCat){
                    selectSubCat++
                    numQuestion=0
                }
            }else{
                numQuestion++
            }
            lengthQuestions=state.cat.subCat[selectSubCat].quizes.length
            currentQuiz=state.cat.subCat[selectSubCat].quizes[numQuestion]
            currentQuiz=currentQuizFunc(currentQuiz, selectSubCat)
            return(
            {...state, numQuestion, selectSubCat, isChecked:false, hintMode:false, lengthQuestions, currentQuiz})
        case AC_PREV_C:
            if(numQuestion<=0){
                if(selectSubCat>0){
                    selectSubCat--
            lengthQuestions=state.cat.subCat[selectSubCat].quizes.length 
                    numQuestion=lengthQuestions-1
                }
            }else{
                numQuestion--
            }
            currentQuiz=state.cat.subCat[selectSubCat].quizes[numQuestion]
            currentQuiz=currentQuizFunc(currentQuiz, selectSubCat)
            return(
            {...state, numQuestion, selectSubCat, isChecked:false, hintMode:false, lengthQuestions, currentQuiz})

        case AC_HINT_MODE_C:
            // currentQuiz=currentQuizFunc(state.currentQuiz, selectSubCat)
             let hint=(state.hintMode===true)?false:true
            return(
            {...state, hintMode:hint})

        case AC_BOLD_CLASS_C1:
                if(!state.isChecked){
                let k1=action.keyCard
                let k2=action.keyP
                newState.currentQuiz=currentQuizFunc(state.currentQuiz)
                // newState.currentQuiz={...currentQuiz}
                newState.currentQuiz.card[k1].p[0].cls=''
                newState.currentQuiz.card[k1].p[1].cls=''
                newState.currentQuiz.card[k1].p[2].cls=''
                newState.currentQuiz.card[k1].p[k2].cls='bold'
                }
                return(newState)

        case AC_BOLD_CLASS_C2:
                if(!state.isChecked){
                let k1=action.keyStr
                let k2=action.keyW
                newState.currentQuiz=currentQuizFunc(state.currentQuiz)
                newState.currentQuiz.arrAnswer[k1][0].cls=''
                newState.currentQuiz.arrAnswer[k1][1].cls=''
                newState.currentQuiz.arrAnswer[k1][2].cls=''
                newState.currentQuiz.arrAnswer[k1][k2].cls='bold'
                }
                return(newState)

        case AC_CHECK_C1:
            currentQuiz=currentQuizFunc(state.currentQuiz)
            newState.currentQuiz={...currentQuiz}
            state.currentQuiz.card.map((card, i)=>{
                card.p.map((str, n)=>{
                    let newStr=newState.currentQuiz.card[i].p[n]
                    if(str.answer && str.cls.includes('bold')){
                        newStr.cls=newStr.cls+' green'
                        rightAnswers++
                    }else{
                        if(str.answer && state.hintMode)
                        newStr.cls=newStr.cls+' green'
                        else{
                            if(str.answer && !state.hintMode)
                                newStr.cls=''
                        }
                        }
                    if(!str.answer && str.cls.includes('bold'))
                    newStr.cls=newStr.cls+' red'
                    return n
                })
                return i
            })
            if(action.permit){
            pointForAnswer=newState.currentQuiz.template.point
            quantity=state.currentQuiz.card.length
            newState.isChecked=true
            newState.timerOfComponent=action.time
            curRightPoints=rightAnswers*pointForAnswer
            newState.curRightPoints=curRightPoints
            newState.arrStatistic=[...state.arrStatistic]
            statistic={catHeader, headQuiz, selectSubCat:state.selectSubCat, numQuestion:state.numQuestion, quantity, points:pointForAnswer, curRightPoints, sumPoints:quantity*pointForAnswer, timerOfComponent:action.time }
            newState.arrStatistic.push(statistic)
            }
            return(newState)

        case AC_CHECK_C2:
            // let arrCards
            newState.currentQuiz=currentQuizFunc(state.currentQuiz)
            let newArrAnswer=state.currentQuiz.arrAnswer.map((arrStr, i)=>{
                let newWords=arrStr.map((str, n)=>{
                    // let newStr=newState.currentQuiz.arrStr[i].p[n]
                    // console.log(arrStr)
                    let newWord=arrStr[n]
                    if(str.answ && str.cls.includes('bold')){
                        newWord.cls=newWord.cls+' green'
                        rightAnswers++
                    }else{
                        if(str.answ && state.hintMode)
                        newWord.cls=newWord.cls+' green'
                        else{
                            if(str.answ && !state.hintMode)
                            newWord.cls=''
                        }
                        }
                    if(!str.answ && str.cls.includes('bold'))
                    newWord.cls=newWord.cls+' red'
                    return(newWord)
                })
                return(newWords)
            })
            newState.currentQuiz.arrAnswer=[...newArrAnswer]
            if(action.permit){
            pointForAnswer=newState.currentQuiz.template.point
            quantity=state.currentQuiz.arrAnswer.length-1
            newState.isChecked=true
            newState.timerOfComponent=action.time
            curRightPoints=rightAnswers*pointForAnswer
            newState.curRightPoints=curRightPoints
            newState.arrStatistic=[...state.arrStatistic]
            statistic={catHeader, headQuiz, selectSubCat:state.selectSubCat, numQuestion:state.numQuestion, quantity, points:pointForAnswer, curRightPoints, sumPoints:quantity*pointForAnswer, timerOfComponent:action.time }
            newState.arrStatistic.push(statistic)
            }
            return(newState)

        case AC_INP_ANSW_C3:
            newState.currentQuiz=currentQuizFunc()
            newState.currentQuiz.arrAnswer[action.countInput].inpWord=action.value
            return(
            {...newState})

        case AC_CHECK_C3:
            newState.currentQuiz=currentQuizFunc()
                for(let x of newState.currentQuiz.arrAnswer){
                    let b1_answ=x.answ.toLowerCase().split('')
                    .filter(function(n) { return n !== ' ' && n !== ''}).join('')
                    let b1_inpWord=x.inpWord.toLowerCase().split('')
                    .filter(function(n) { return n !== ' ' && n !== '' }).join('')
                    if(b1_answ===b1_inpWord){
                        x.cls='green'
                        rightAnswers++
                    }else x.cls='red'
                }
                pointForAnswer=newState.currentQuiz.template.point
                quantity=state.currentQuiz.arrAnswer.length-1
                newState.isChecked=true
                newState.timerOfComponent=action.time
                curRightPoints=rightAnswers*pointForAnswer
                newState.curRightPoints=curRightPoints
                newState.arrStatistic=[...state.arrStatistic]
                statistic={catHeader, headQuiz, selectSubCat:state.selectSubCat, numQuestion:state.numQuestion, quantity, points:pointForAnswer, curRightPoints, sumPoints:quantity*pointForAnswer, timerOfComponent:action.time }
                newState.arrStatistic.push(statistic)
                return(newState)

        case AC_CHECK_C5:
            newState.currentQuiz=currentQuizFunc()
                // let x
                for(let x of newState.currentQuiz.arrAnswer){
                    let b1_answ=x.answ.toLowerCase().split('')
                    .filter(function(n) { return n !== ' ' && n !== '' && n !== '"' && n !== `'` && n !== `,` && n !== `;` && n !== `:`  && n !== `.`}).join('')
                    let b1_inpWord=x.inpWord.toLowerCase().split('')
                    .filter(function(n) { return n !== ' ' && n !== '' && n !== '"' && n !== `'` && n !== `,` && n !== `;` && n !== `:`  && n !== `.`}).join('')

                    // if(x.answ.toLowerCase()===x.inpWord.toLowerCase()){
                    if(b1_answ===b1_inpWord){
                        x.cls='bGreen'
                        rightAnswers++
                    }else x.cls='red'
                }
                pointForAnswer=newState.currentQuiz.template.point
                quantity=state.currentQuiz.arrAnswer.length-1
                newState.isChecked=true
                newState.timerOfComponent=action.time
                curRightPoints=rightAnswers*pointForAnswer
                newState.curRightPoints=curRightPoints
                newState.arrStatistic=[...state.arrStatistic]
                statistic={catHeader, headQuiz, selectSubCat:state.selectSubCat, numQuestion:state.numQuestion, quantity, points:pointForAnswer, curRightPoints, sumPoints:quantity*pointForAnswer, timerOfComponent:action.time }
                newState.arrStatistic.push(statistic)
                return(newState)
        case AC_BOLD_CLASS_C7:
            newState.currentQuiz=currentQuizFunc()
            newState.currentQuiz.arrRows[action.keyRow]['clsP']=''
            newState.currentQuiz.arrRows[action.keyRow]['clsF']=''
            newState.currentQuiz.arrRows[action.keyRow][action.keyCell]='bold'
            return(newState)
        case AC_CHECK_C7:
            newState.currentQuiz=currentQuizFunc()
            let rowsC7=[]
            let oldRow=state.currentQuiz.arrRows
            rowsC7=newState.currentQuiz.arrRows.map((rowC7,i)=>{
                if(i===0)return rowC7
                let answ=rowC7.answ
            if(oldRow[i].clsP.includes('bold')){
                if(answ){
                rightAnswers++
                rowC7.clsP=rowC7.clsP+' bGreen'
                }else rowC7.clsP=rowC7.clsP+' red'
            }
            
            if(oldRow[i].clsF.includes('bold')){
                if(!answ){
                    rightAnswers++
                    rowC7.clsF=rowC7.clsF+' bGreen'
                }else rowC7.clsF=rowC7.clsF+' red'
            }
            
                if(answ && !oldRow[i].clsP.includes('bold')){
                    if(state.hintMode)
                    rowC7.clsP=rowC7.clsP+' green'
                    else rowC7.clsP=''
                }
                if(!answ && !oldRow[i].clsF.includes('bold')){
                    if(state.hintMode)
                    rowC7.clsF=rowC7.clsF+' green'
                    else rowC7.clsF=''
                }
                    return rowC7
            })
            newState.currentQuiz.arrRows=rowsC7
            if(action.permit){
                pointForAnswer=newState.currentQuiz.template.point
                quantity=state.currentQuiz.rows.length-1
                newState.isChecked=true
                newState.timerOfComponent=action.time
                curRightPoints=rightAnswers*pointForAnswer
                newState.curRightPoints=curRightPoints
                newState.arrStatistic=[...state.arrStatistic]
                statistic={catHeader, headQuiz, selectSubCat:state.selectSubCat, numQuestion:state.numQuestion, quantity, points:pointForAnswer, curRightPoints, sumPoints:quantity*pointForAnswer, timerOfComponent:action.time }
                newState.arrStatistic.push(statistic)
                }
                
            return(newState)

        case AC_CLEAR_STATE_C:
            // currentQuiz=state.cat.subCat[0].quizes[0]
            // currentQuiz=currentQuizFunc()
            return(
            {...initialState})
            // {...initialState, currentQuiz})
        
        // case AC_COPY_STATISTIC:
        //     return(
        //     {...state, arrStatistic:action.arrStatistic})
        default:return state
    }
}