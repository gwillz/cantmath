import { Context, Fragment, createElement } from "@b9g/crank";


export interface Player {
    id: string;
    name: string;
    rounds: number[];
}

type Props = {
    player: Player;
    isNext?: boolean;
    onUpdate: (id: string, update: Partial<Omit<Player, 'id'>>) => void;
    onPress: (id: string) => void;
}

export function *Player(this: Context<Props>, props: Props) {

    let timer = 0;

    let value = 1;

    const onCancel = () => {
        clearTimeout(timer);
    }

    const onPress = () => {
        timer = setTimeout(() => {
            props.onPress(props.player.id);
        }, 500);
    }

    const onInput = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        value = parseInt(input.value, 10);
    }

    for (let props of this) {

        const total = props.player.rounds.reduce((total, score) => total + score, 0);

        const onSubmit = (event: Event) => {
            event.preventDefault();

            props.onUpdate(props.player.id, {
                rounds: [...props.player.rounds, value],
            });
        }

        yield (
            <form tabindex="0" class="player" onmousedown={onPress} onmouseup={onCancel} onsubmit={onSubmit}>
                <h2 class="player__name">{props.player.name}</h2>
                <div class="spacer"/>
                {props.isNext && (
                    <input
                        type="number"
                        name="score"
                        value={value}
                        oninput={onInput}
                    />
                )}
                <h2 class="player__total">{total}</h2>
            </form>
        )
    }
}
