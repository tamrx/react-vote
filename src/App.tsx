import React, {useState} from 'react';
import './App.css';
import {Grid, Typography} from "@mui/material";
import PollQuestion from "./components/PollQuestion";
import ThemeProvider from './theme';
import PollAnswer from "./components/PollAnswer";
import {AppContext} from "./contexts/AppContext";
import {Answer} from "./types";
import PollVote from "./components/PollVote";

function App() {
    const pageTitle = 'Sir vote-a-lot';
    document.title = pageTitle;

    const [question, setQuestion] = useState<string>("");
    const [answerList, setAnswerList] = useState<Answer[]>([]);


    const dispatchPollEvent = (actionType: string, payload: any) => {
        switch (actionType) {
            case 'SET_QUESTION':
                setQuestion(payload.question);
                return;
            case 'ADD_ANSWER':
                setAnswerList([...answerList, payload]);
                return;
            case 'REMOVE_ANSWER':
                setAnswerList(answerList.filter((item: Answer) => item.id !== payload.answerId));
                return;
            case 'EDIT_ANSWER':
                setAnswerList([...answerList.filter((v) => v.id !== payload.answer.id), payload.answer]);
                return;
            default:
                return;
        }
    };

    return (
        <AppContext.Provider value={{answerList, question, dispatchPollEvent}}>
            <ThemeProvider>
                <div className="App" style={{padding: 24}}>
                    <Typography component={'h1'} sx={{my: 4, fontSize: 40, textAlign: 'left'}}>
                        {pageTitle}
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <PollQuestion title={`Question`}/>
                            <PollAnswer title={'Answers'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <PollVote question={question} answers={answerList} />
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                    </Grid>
                </div>

            </ThemeProvider>
        </AppContext.Provider>

    );
}

export default App;
