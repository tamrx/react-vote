import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@mui/material";
import {Answer} from "../types";
import React, {useId} from "react";

type PollVoteProps = {
    question: string;
    answers: Answer[];
}

export default function PollVote({question, answers}: PollVoteProps) {
    const key = useId();
    return (<>
        { question && answers.length > 0 ?
                <Card>
                    <CardHeader sx={{textAlign: 'left'}} title={question}/>
                    <CardContent>
                        <FormControl
                            sx={{ display: 'flex'}}
                        >
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                {
                                    answers.map((item, index) => {
                                        return <React.Fragment key={`${index}-${key}`}><FormControlLabel value={item.text} control={<Radio />} label={item.text} /></React.Fragment>
                                    })
                                }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>
                </Card>
            : <Card sx={{ minHeight: 390 }}>
                    <CardHeader sx={{textAlign: 'left', color: '#8e8e8e'}} title={'No question or answers added.'}/>
                    <CardContent>

                    </CardContent>
                </Card>
        }
        </>
    )
}