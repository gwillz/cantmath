import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";


type Props = {
    onSubmit: (player: Player) => void;
}

export function *NewPlayer(this: Context, props: Props) {

    let name = '';

    const onSubmit = (event: Event) => {
        event.preventDefault();

        if (name.trim() == '') {
            return;
        }

        props.onSubmit({
            id: Math.random().toString(36).slice(2, 8),
            name: name,
            rounds: [],
        });

        name = '';
        this.refresh();
    }

    const onInput = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        name = input.value;
    }

    for (let {} of this) {
        yield (
            <form class="player__new__form" onsubmit={onSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    oninput={onInput}
                    value={name}
                />
                <button type="submit">Add Player</button>
            </form>
        )
    }
}
