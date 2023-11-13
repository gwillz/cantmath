import { Context, createElement } from "@b9g/crank";


export interface Player {
    id: string;
    name: string;
    rounds: number[];
}

type Props = {
    player: Player;
    onDelete: (id: string) => void;
}

export function *Player(this: Context, props: Props) {

    const total = props.player.rounds.reduce((total, score) => total + score, 0);
    const round = props.player.rounds.length;

    let timer = 0;

    const onCancel = () => {
        clearTimeout(timer);
    }

    const onPress = () => {
        timer = setTimeout(() => {
            if (confirm(`Delete player? - ${props.player.name}`)) {
                props.onDelete(props.player.id);
            }
        }, 500);
    }

    return (
        <div tabindex="0" class="player" onmousedown={onPress} onmouseup={onCancel}>
            <h2 class="player__name">{props.player.name}</h2>
            <div class="spacer"/>
            <h2 class="player__total">{total}</h2>
        </div>
    )
}
