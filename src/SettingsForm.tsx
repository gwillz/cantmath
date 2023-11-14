import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";
import { PlayerForm } from "./PlayerForm";
import { Header } from "./Header";

export interface Settings {
    players: Player[];
}

type Props = {
    players: Player[];
    onUpdate: (players: Player[]) => void;
    onClose: () => void;
}

export function SettingsForm(this: Context, props: Props) {

    const onAddPlayer = (player: Player) => {
        props.onUpdate([...props.players, player]);
    }

    const onUpdatePlayer = (id: string, update: Partial<Omit<Player, 'id'>>) => {
        const player = props.players.find(p => p.id === id)!;
        Object.assign(player, update);
        props.onUpdate(props.players);
    }

    const onDeletePlayer = (id: string) => {
        if (confirm('Are you sure you want to delete this player?')) {
            props.onUpdate(props.players.filter(player => player.id !== id));
        }
    }

    const onReset = () => {
        if (confirm('Are you sure you want to reset the game?')) {
            props.onUpdate([]);
        }
    }

    const onSave = () => {
        // Kind of a lie, but effectively the same.
        props.onClose();
    }

    return (
        <div>
            <Header />

            {props.players.map(player => (
                <PlayerForm
                    crank-key={player.id}
                    player={player}
                    onUpdate={onUpdatePlayer}
                    onDelete={onDeletePlayer}
                />
            ))}

            <PlayerForm
                crank-key={'new' + props.players.length}
                onCreate={onAddPlayer}
            />

            <hr/>

            <div class="toolbar">
                {props.players.length > 0 && (
                    <button type="button" onclick={onReset}>Reset Game</button>
                )}
                {props.players.length > 0 && (
                    <button type="button" onclick={onSave}>Save</button>
                )}
            </div>
        </div>
    )
}
