// @mui
import {Card, CardHeader, LinearProgress, Stack, Typography} from '@mui/material';
// utils
import {fPercent} from '../utils/formatNumber';
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

// ----------------------------------------------------------------------

type ItemProps = {
    text: string;
    count: number;
    id: number;
};

export default function PollChart() {
    const { dispatchPollEvent } = useContext(AppContext);
    const votes = dispatchPollEvent('GET_VOTES');
    const question = dispatchPollEvent('GET_QUESTION');

    return (
        <Card>
            <CardHeader title={question} />
            <Stack spacing={4} sx={{ p: 3 }}>
                {votes.sort((a: any,b: any) => a.count - b.count).map((vote: ItemProps) => (
                    <ProgressItem key={vote.text} vote={vote} />
                ))}
            </Stack>
        </Card>
    );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
    vote: ItemProps;
};

function ProgressItem({ vote }: ProgressItemProps) {
    return (
        <Stack spacing={1}>
            <Stack direction="row" alignItems="center">
                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                    {vote.text}
                </Typography>
                <Typography variant="subtitle2">{vote.count}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    &nbsp;({fPercent(vote.count)})
                </Typography>
            </Stack>

            <LinearProgress
                variant="determinate"
                value={vote.count}
                color={
                    (vote.count < 25 && 'warning') ||
                    (vote.count < 50  && 'info') ||
                    'primary'
                }
            />
        </Stack>
    );
}
