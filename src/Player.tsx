import { Context, createElement } from "@b9g/crank";


export interface Player {
    id: string;
    name: string;
    rounds: number[];
}

type Props = {
    player: Player;
    onEdit: (id: string) => void;
}

export function *Player(this: Context, props: Props) {

    const total = props.player.rounds.reduce((total, score) => total + score, 0);
    const round = props.player.rounds.length;

    const onEdit = () => {
        props.onEdit(props.player.id);
    }

    return (
        <div class="player">
            <h2>{props.player.name}</h2>
            <span class="player__total">{total}</span>
            {!!round && (
                <span class="player__round">{round}</span>
            )}
            <button type="button" onclick={onEdit}>Edit</button>
        </div>
    )
}
