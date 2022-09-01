// @mui
import {styled} from '@mui/material/styles';
import {Card, CardContent, CardHeader, CardProps, TextField} from '@mui/material';
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({theme}) => ({
    textAlign: 'left',
    backgroundColor: theme.palette.primary.lighter,
}));

// ----------------------------------------------------------------------

interface PollCardProps extends CardProps {
    title?: string;

}

export default function PollQuestion({title, ...other}: PollCardProps) {
    const {dispatchPollEvent, question} = useContext(AppContext);

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event?.target?.value;
        dispatchPollEvent('SET_QUESTION', {question: newValue});
    };
    return (
        <RootStyle {...other}>
            <CardHeader title={title}/>
            <CardContent>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Type your question"
                    size={'small'}
                    fullWidth
                    value={question}
                    sx={{mb: 3}}
                    onChange={handleQuestionChange}
                />
            </CardContent>
        </RootStyle>
    );
}
