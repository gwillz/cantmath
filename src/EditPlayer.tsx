import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";


type Props = {
    player: Player;
    onUpdate: (id: string, player: Partial<Omit<Player, 'id'>>) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
}

export function *EditPlayer(this: Context, props: Props) {

    const total = props.player.rounds.reduce((total, score) => total + score, 0);

    let value = 1;

    const onSubmit = (event: Event) => {
        event.preventDefault();

        props.onUpdate(props.player.id, {
            rounds: [...props.player.rounds, value],
        });

        props.onClose();
    }

    const onDelete = () => {
        props.onDelete(props.player.id);
    }

    const onUndo = () => {
        props.onUpdate(props.player.id, {
            rounds: props.player.rounds.slice(0, -1),
        })
    }

    const onInput = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        value = parseInt(input.value, 10);
    }

    for (let {} of this) {
        yield (
            <form onsubmit={onSubmit} class="player__edit__form">
                <h2>Editing: {props.player.name}</h2>
                <button class="player__edit__cancel" type="button" onclick={props.onClose}>Cancel</button>

                <div class="player__scores">
                    {props.player.rounds.length > 0 ? (
                        <ol>
                            {props.player.rounds.map((score, index) => (
                                <li crank-key={index}>Round {index + 1}<span class="spacer"/>{score > 0 && '+'}{score}</li>
                            ))}
                            <li crank-key={'total' + total} class="player__edit__total">Total <span class="spacer"/>{total}</li>
                        </ol>
                    ) : (
                        <p>No scores.</p>
                    )}
                </div>

                <button class="player__edit__remove" type="button" onclick={onUndo}>Undo</button>
                <button class="player__edit__delete" type="button" onclick={onDelete}>Delete</button>
            </form>
        )
    }
}
