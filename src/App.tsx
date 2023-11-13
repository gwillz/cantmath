import { Context, createElement } from "@b9g/crank";
import { Player } from "./Player";
import { Game } from "./Game";
import { SettingsForm } from "./SettingsForm";
import { ViewScores } from "./ViewScores";


type AppView = 'game' | 'settings' | 'scores';


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

    let view: AppView = 'game';
    let playerId = '';

    const onEdit = (newPlayers: Player[]) => {
        players.splice(0, players.length, ...newPlayers);
        updatePlayers(players);
        this.refresh();
    }

    const onUpdate = (id: string, update: Partial<Omit<Player, 'id'>>) => {
        const player = players.find(player => player.id === id)!;
        Object.assign(player, update)

        this.refresh();

        updatePlayers(players);
    }

    const onSettings = () => {
        view = 'settings';
        this.refresh();
    }

    const onScores = (id: string) => {
        playerId = id;
        view = 'scores';
        this.refresh();
    }

    const onClose = () => {
        view = 'game';
        this.refresh();
    }

    for (let {} of this) {

        if (players.length == 0) {
            view = 'settings';
        }

        const player = players.find(player => player.id === playerId);

        yield (
            <div class="container">
                {view === 'game' ? (
                    <Game
                        players={players}
                        onUpdate={onUpdate}
                        onSettings={onSettings}
                        onScores={onScores}
                    />
                ) : view === 'settings' ? (
                    <SettingsForm
                        players={players}
                        onUpdate={onEdit}
                        onClose={onClose}
                    />
                ) : (
                    <ViewScores
                        player={player!}
                        onUpdate={onUpdate}
                        onClose={onClose}
                    />
                )}
            </div>
        )
    }
}
