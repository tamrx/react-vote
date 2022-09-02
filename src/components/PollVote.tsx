import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import React, {useContext, useId, useState} from "react";
import {AppContext} from "../contexts/AppContext";

// {question, answers}: PollVoteProps

export default function PollVote() {
    const {dispatchPollEvent} = useContext(AppContext);
    const question = dispatchPollEvent('GET_QUESTION');
    const answers = dispatchPollEvent('GET_ANSWERS_LIST');
    const votesList = dispatchPollEvent('GET_VOTES');
    const [currentVote, setCurrentVote] = useState<any>({});
    const key = useId();

    const handleVote = () => {
        const itemFounded = votesList.find((v: any) => v.id === currentVote.id);

        if (itemFounded && Object.keys(itemFounded).length > 0) {
            dispatchPollEvent('ADD_VOTES', {vote: {...currentVote, count: itemFounded.count + 1}});
        } else {
            dispatchPollEvent('ADD_VOTES', {vote: {...currentVote, count: 1}});
        }
    }
    return (<>
            {question ?
                <Card>
                    <CardHeader sx={{textAlign: 'left'}} title={question}/>
                    <CardContent>
                        <FormControl
                            sx={{display: 'flex'}}
                        >
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                {
                                    answers.length > 0 ? answers.map((item: any, index: number) => {
                                        return (
                                            <React.Fragment key={`${index}-${key}`}>
                                                <FormControlLabel
                                                    label={item.text}
                                                    value={item.id}
                                                    control={<Radio onClick={() => setCurrentVote(item)}/>}
                                                />
                                            </React.Fragment>
                                        )
                                    }) : (<Typography sx={{color: '#8e8e8e'}}>
                                        <small>No answers available. </small>
                                    </Typography>)
                                }
                            </RadioGroup>
                        </FormControl>
                        <Divider sx={{my: 2}}/>
                        <Grid>
                            <Button
                                disabled={!(answers.length > 0)}
                                variant={'contained'}
                                fullWidth
                                onClick={handleVote}
                            >
                                Vote
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
                : (
                    <Card sx={{minHeight: 350}}>
                        <CardHeader sx={{textAlign: 'left', color: '#8e8e8e'}} title={'No question or answers added.'}/>
                    </Card>
                )
            }
        </>
    )
}