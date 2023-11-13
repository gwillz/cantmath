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

    let editing: string | null = null;

    const getRound = () => {
        return players.reduce((round, player) => Math.max(round, player.rounds.length), 0);
    }

    const getNextPlayer = () => {
        if (players.length == 0) {
            return null;
        }

        const round = getRound();

        for (let player of players) {
            if (player.rounds.length < round) {
                return player;
            }
        }

        return players[0];
    }

    const onCreate = (player: Player) => {
        players.push(player);

        updatePlayers(players);
        this.refresh();
    }

    const onUpdate = (id: string, update: Partial<Omit<Player, 'id'>>) => {
        const player = players.find(player => player.id === id)!;
        Object.assign(player, update)

        this.refresh();

        updatePlayers(players);
    }

    const onDelete = (id: string) => {
        const index = players.findIndex(player => player.id === id);

        if (index !== -1) {
            players.splice(index, 1);
        }

        editing = null;

        this.refresh();

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

    const onNext = () => {
        const player = getNextPlayer();

        if (player) {
            editing = player.id;
            this.refresh();
        }
    }

    for (let {} of this) {
        const next = getNextPlayer();

        yield (
            <div class="container">
                <div class="header">
                    <h1>Can't Math</h1>
                    <button type="button" class="status" onclick={onNext}>Round: {getRound()}</button>
                </div>

                {players.map(player => (
                    <Player
                        crank-key={player.id}
                        player={player}
                        isNext={player.id === next?.id}
                        onUpdate={onUpdate}
                        onEdit={onOpenEdit}
                    />
                ))}

                <hr/>

                {editing ? (
                    <EditPlayer
                        crank-key={editing}
                        player={players.find(player => player.id === editing)!}
                        onUpdate={onUpdate}
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
