import React, {useContext, useState} from "react";
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {Answer} from "../types";
import {AppContext} from "../contexts/AppContext";
import {THRESHOLD} from "../utils/static";

interface AnswerProps {
    title: string;
}

export default function PollAnswer({title}: AnswerProps) {

    // -- States, Contexts
    const {dispatchPollEvent, answerList} = useContext(AppContext);
    const answerItem = dispatchPollEvent('GET_ANSWER');
    // -- variables
    const answerCount = answerList?.length || 0;

    // -- functions
    const generateId = () => {
        const highestId = Math.max.apply(Math, answerList.map(function (element: any) {
            return element.id;
        }));
        let newId = 1;

        if (highestId > 0) {
            newId = (highestId + 1);
        }
        return newId;
    };

    function createNewAnswerItem() {
        if (answerItem !== '') {
            const item = {id: generateId(), text: answerItem};
            dispatchPollEvent('ADD_ANSWER', {answer: {...item, count: 0}});
        }
        dispatchPollEvent('SET_ANSWER', {answer: ''})
    }

    function handleAdd(e: React.UIEvent) {
        e.preventDefault();
        createNewAnswerItem();
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            createNewAnswerItem();
        }
    };

    const deleteItem = (id: any) => {
        dispatchPollEvent('REMOVE_ANSWER', {answerId: id});
    };

    const editAnswer = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, item: Answer) => {
        const newText = e.target.value;
        const newValue = {id: item.id, text: newText};

        dispatchPollEvent('EDIT_ANSWER', {answer: newValue});

    }


    const displayAnswers = answerList.sort((a:any, b:any) => a.id - b.id).map((item: Answer, index: number) => (
        <List e2e-id={`answer-${index}`} key={item.id}>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" disabled={index < 2} onClick={() => deleteItem(item.id)}>
                        <DeleteIcon/>
                    </IconButton>
                }
            >
                <Badge badgeContent={index + 1} color="primary">
                    <ListItemText>
                        <TextField
                            e2e-id={`text-field-answer-edit-${index}-${item.id}`}
                            disabled={item?.text?.length >= 80}
                            inputProps={{ maxLength: 80 }}
                            size={'small'}
                            value={item.text}
                            label={`Answer #${index + 1}`}
                            sx={{width: 300}}
                            onChange={(e) => editAnswer(e, item)}
                        >
                        </TextField>
                    </ListItemText>
                </Badge>
            </ListItem>
        </List>
    ));

    return (
        <Card sx={{margin: '20px 0'}}>
            <CardHeader title={title} subheader={`${answerCount} / ${THRESHOLD}`} sx={{textAlign: 'left'}} action={
                <Button
                    e2e-id={'btn-reset'}
                    variant={'contained'}
                    color={'error'}
                    onClick={() => dispatchPollEvent('RESET')}
                >
                    Reset
                </Button>
            }/>
            <CardContent>
                {displayAnswers.length > 0 ? <ul style={{padding: 0}}>{displayAnswers}</ul> :
                    <Typography sx={{color: '#8e8e8e'}} component={'p'}><small>No options, You can add the options
                        answers bellow</small></Typography>}
                <Divider sx={{my: 2}}/>

                <Grid sx={{float: 'left', mb: 4, display: 'flex', justifyContent: 'space-between'}}>
                    <Tooltip title={answerCount >= THRESHOLD ? `You can't add more than ${THRESHOLD} answers` : 'Add Answer'}>
                        <>
                            <TextField
                                e2e-id={'text-field-answer'}
                                type="text"
                                name="answerItem"
                                inputProps={{ maxLength: 80 }}
                                size={'small'}
                                label={'Type an Answer'}
                                value={answerItem}
                                disabled={answerCount >= THRESHOLD}
                                onChange={e => {
                                    dispatchPollEvent('SET_ANSWER', { answer: e.currentTarget.value });
                                }}
                                sx={{mr: 4, minWidth: 470}}
                                onKeyPress={handleKeyPress}
                            />

                            <Button e2e-id={'btn-add'} disabled={answerCount >= THRESHOLD} variant={'contained'} onClick={handleAdd}><AddIcon/></Button>
                        </>
                    </Tooltip>
                </Grid>

            </CardContent>
        </Card>
    );
}

