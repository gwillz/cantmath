import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";
import { PlayerForm } from "./PlayerForm";
import { Header } from "./Header";

export interface Settings {
    color?: string;
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

    const onEditPlayer = (player: Player) => {
        const index = props.players.findIndex(p => p.id === player.id);

        if (index !== -1) {
            const players = [...props.players];
            players.splice(index, 1, player);
            props.onUpdate(players);
        }
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

    return (
        <div>
            <Header />

            {props.players.map(player => (
                <PlayerForm
                    crank-key={player.id}
                    player={player}
                    onSubmit={onEditPlayer}
                    onDelete={onDeletePlayer}
                />
            ))}

            <PlayerForm
                crank-key='new'
                onSubmit={onAddPlayer}
            />

            <hr/>

            <div class="toolbar">
                <button type="button" onclick={onReset}>Reset Game</button>
                <button type="button" onclick={props.onClose}>Back</button>
            </div>
        </div>
    )
}
