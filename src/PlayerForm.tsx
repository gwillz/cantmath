import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";
import Color from 'color';

type Props = {
    onUpdate?: (id: string, player: Partial<Omit<Player, 'id'>>) => void;
    onCreate?: (player: Player) => void;
    onDelete?: (id: string) => void;
    player?: Player;
}


function randomColor() {
    let color = Color({h: Math.random() * 360, s: 70, l: 50});
    color = color.lightness(50);
    return color.hex();
}


export function *PlayerForm(this: Context<Props>, props: Props) {

    let name = '';
    let color = randomColor();

    if (props.player) {
        name = props.player.name;
        color = props.player.color;
    }

    const onSubmit = (event: Event) => {
        event.preventDefault();

        if (props.player) {
            return;
        }

        if (name.trim() == '') {
            return;
        }

        props.onCreate?.({
            id: Math.random().toString(36).slice(2, 8),
            name: name,
            color: color,
            rounds: [],
        });

        name = '';

        this.refresh();
    }

    const onDelete = () => {
        if (props.player) {
            props.onDelete?.(props.player.id);
        }
    }

    const onInput = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        name = input.value;

        if (props.player) {
            props.onUpdate?.(props.player.id, { name });
        }
    }

    const onColor = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        color = input.value;

        if (props.player) {
            props.onUpdate?.(props.player.id, { color });
        }
    }

    for (let props of this) {
        yield (
            <form class="player__edit__form" onsubmit={onSubmit}>
                <input
                    class="player__edit__color"
                    type="color"
                    oninput={onColor}
                    value={color}
                />
                <input
                    class="player__edit__input"
                    type="text"
                    placeholder="Name"
                    oninput={onInput}
                    value={name}
                />
                {props.player ? (
                    <button type="button" onclick={onDelete}>Delete</button>
                ) : (
                    <button type="submit">Add Player</button>
                )}
            </form>
        )
    }
}
