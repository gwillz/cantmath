import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";


type Props = {
    player: Player;
    onEdit: (id: string, player: Partial<Omit<Player, 'id'>>) => void;
    onRemove: (id: string) => void;
    onClose: () => void;
}

export function *EditPlayer(this: Context, props: Props) {

    let value = 1;

    const onSubmit = (event: Event) => {
        event.preventDefault();

        props.onEdit(props.player.id, {
            rounds: [...props.player.rounds, value],
        });

        props.onClose();
    }

    const onRemove = () => {
        props.onRemove(props.player.id);
    }

    const onInput = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        value = parseInt(input.value, 10);
    }

    for (let {} of this) {
        yield (
            <form onsubmit={onSubmit} class="player__edit__form">
                <ol class="player__scores">
                    {props.player.rounds.map((score, index) => (
                        <li crank-key={index}>{score}</li>
                    ))}
                </ol>

                <input type="number" name="score" value={value} oninput={onInput} />
                <button>Add</button>
                <button type="button" onclick={onRemove}>Remove</button>
                <button type="button" onclick={props.onClose}>Cancel</button>
            </form>
        )
    }
}
