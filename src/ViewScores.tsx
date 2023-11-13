import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";


type Props = {
    player: Player;
    onUpdate: (id: string, player: Partial<Omit<Player, 'id'>>) => void;
    onClose: () => void;
}

export function ViewScores(this: Context, props: Props) {

    const total = props.player.rounds.reduce((total, score) => total + score, 0);

    const onUndo = () => {
        props.onUpdate(props.player.id, {
            rounds: props.player.rounds.slice(0, -1),
        })
    }

    return (
        <div>
            <h2>Editing: {props.player.name}</h2>

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

            <div class="toolbar">
                <button class="player__edit__remove" type="button" onclick={onUndo}>Undo</button>
                <button class="player__edit__cancel" type="button" onclick={props.onClose}>Back</button>
            </div>
        </div>
    )
}
