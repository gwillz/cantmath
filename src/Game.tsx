import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";
import { Header } from "./Header";


type Props = {
    players: Player[];
    onUpdate: (id: string, update: Partial<Omit<Player, 'id'>>) => void;
    onScores: (id: string) => void;
    onSettings: () => void;
}

export function Game(this: Context, props: Props) {

    const getRound = () => {
        return props.players.reduce((round, player) => Math.max(round, player.rounds.length), 0);
    }

    const getNextPlayer = () => {
        if (props.players.length == 0) {
            return null;
        }

        const round = getRound();

        for (let player of props.players) {
            if (player.rounds.length < round) {
                return player;
            }
        }

        return props.players[0];
    }

    const next = getNextPlayer();

    return (
        <div>
            <Header round={getRound()} />

            {props.players.map(player => (
                <Player
                    crank-key={player.id}
                    player={player}
                    isNext={player.id === next?.id}
                    onUpdate={props.onUpdate}
                    onPress={props.onScores}
                />
            ))}
            <hr/>
            <div class="toolbar">
                <button type="button" onclick={props.onSettings}>Settings</button>
            </div>
        </div>
    )
}
