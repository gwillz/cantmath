import { Context, Fragment, createElement } from "@b9g/crank";


export interface Player {
    id: string;
    name: string;
    color: string;
    rounds: number[];
}

type Props = {
    player: Player;
    isNext?: boolean;
    onUpdate: (id: string, update: Partial<Omit<Player, 'id'>>) => void;
    onPress: (id: string) => void;
}

export function *Player(this: Context<Props>, props: Props) {

    let timer = 0;

    let value = 1;

    let input: HTMLInputElement | null = null;

    const onPress = (event: MouseEvent) => {
        event.preventDefault();
        props.onPress(props.player.id);
    }

    const onAdd = (event: Event) => {
        value++;
        input?.focus();
        this.refresh();
    }

    const onSub = () => {
        value--;
        input?.focus();
        this.refresh();
    }

    const onInput = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        value = parseInt(input.value, 10);
    }

    for (let props of this) {

        const total = props.player.rounds.reduce((total, score) => total + score, 0);

        const onSubmit = (event: Event) => {
            event.preventDefault();

            props.onUpdate(props.player.id, {
                rounds: [...props.player.rounds, value],
            });
        }

        yield (
            <form
                tabindex="0"
                class="player"
                oncontextmenu={onPress}
                onsubmit={onSubmit}
                style={{color: props.player.color}}
            >
                <h2 class="player__name">{props.player.name}</h2>
                <div class="spacer"/>
                {props.isNext && (
                    <div class="player__field">
                        <button type="button" onclick={onSub} class="player__button player__button--sub">–</button>
                        <input
                            crank-ref={(ref: any) => input = ref}
                            type="number"
                            value={value}
                            oninput={onInput}
                        />
                        <button type="button" onclick={onAdd} class="player__button player__button--add">+</button>
                    </div>
                )}
                <h2 class="player__total">{total}</h2>
            </form>
        )
    }
}
