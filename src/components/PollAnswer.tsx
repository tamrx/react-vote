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
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {Answer} from "../types";
import {AppContext} from "../contexts/AppContext";

interface AnswerProps {
    title: string;
}

export default function PollAnswer({title}: AnswerProps) {

    const [answerItem, setAnswerItem] = useState<string>("");
    const {dispatchPollEvent, answerList} = useContext(AppContext);

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
        setAnswerItem('');
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


    const display = answerList.map((item: any, index: number) => (
        <List key={item.id}>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
                        <DeleteIcon/>
                    </IconButton>
                }
            >
                <Badge badgeContent={index + 1} color="primary">
                    <ListItemText>
                        <TextField
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
            <CardHeader title={title} sx={{textAlign: 'left'}}/>
            <CardContent>
                {display.length > 0 ? <ul style={{padding: 0}}>{display}</ul> :
                    <Typography sx={{color: '#8e8e8e'}} component={'p'}><small>No options, You can add the options
                        answers bellow</small></Typography>}
                <Divider sx={{my: 2}}/>
                <Grid sx={{float: 'left', mb: 4, display: 'flex', justifyContent: 'space-between'}}>
                    <TextField
                        type="text"
                        name="answerItem"
                        size={'small'}
                        label={'Type an Answer'}
                        value={answerItem}
                        onChange={e => {
                            setAnswerItem(e.currentTarget.value);
                        }}
                        sx={{mr: 4, minWidth: 370}}
                        onKeyPress={handleKeyPress}
                    />
                    <Button variant={'contained'} onClick={handleAdd}><AddIcon/></Button>
                </Grid>
            </CardContent>
        </Card>
    );
}

