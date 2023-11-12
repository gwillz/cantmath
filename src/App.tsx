import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";
import { NewPlayer } from "./NewPlayer";
import { EditPlayer } from "./EditPlayer";


function getPlayers(): Player[] {
    const blob = localStorage.getItem('cantmath:players');
    const players = JSON.parse(blob ?? '[]');
    return players;
}


function updatePlayers(players: Player[]) {
    const blob = JSON.stringify(players);
    localStorage.setItem('cantmath:players', blob);
}


export function *App(this: Context) {

    const players: Player[] = getPlayers();

    const round = players.reduce((round, player) => Math.max(round, player.rounds.length), 0);

    let editing: string | null = null;

    const onCreate = (player: Player) => {
        players.push(player);
        this.refresh();

        updatePlayers(players);
    }

    const onEdit = (id: string, update: Partial<Omit<Player, 'id'>>) => {
        const player = players.find(player => player.id === id)!;
        Object.assign(player, update)

        updatePlayers(players);
    }

    const onRemove = (id: string) => {
        const index = players.findIndex(player => player.id === id);
        players.splice(index, 1);

        updatePlayers(players);
    }

    const onOpenEdit = (id: string) => {
        editing = id;
        this.refresh();
    }

    const onCloseEdit = () => {
        editing = null;
        this.refresh();
    }

    for (let {} of this) {
        yield (
            <div class="container">
                <h1>Can't Math</h1>
                <p>Round: {round}</p>

                {players.map(player => (
                    <Player
                        crank-key={player.id}
                        player={player}
                        onEdit={onOpenEdit}
                    />
                ))}

                <hr/>

                {editing ? (
                    <EditPlayer
                        player={players.find(player => player.id === editing)!}
                        onEdit={onEdit}
                        onRemove={onRemove}
                        onClose={onCloseEdit}
                    />
                ) : (
                    <NewPlayer
                        onSubmit={onCreate}
                    />
                )}
            </div>
        )
    }
}