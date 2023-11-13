import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";


type Props = {
    onSubmit: (player: Player) => void;
    onDelete?: (id: string) => void;
    player?: Player;
}

export function *PlayerForm(this: Context<Props>, props: Props) {

    let name = props.player ? props.player.name : '';

    const onSubmit = (event: Event) => {
        event.preventDefault();

        if (name.trim() == '') {
            return;
        }

        if (props.player) {
            const player = {...props.player, name };
            props.onSubmit(player);
        }
        else {
            props.onSubmit({
                id: Math.random().toString(36).slice(2, 8),
                name: name,
                rounds: [],
            });

            name = '';
        }

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
    }

    for (let props of this) {
        yield (
            <form class="player__edit__form" onsubmit={onSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    oninput={onInput}
                    value={name}
                />
                <button type="submit">{props.player ? 'Save' : 'Add Player'}</button>
                {props.player && (
                    <button type="button" onclick={onDelete}>Delete</button>
                )}
            </form>
        )
    }
}
