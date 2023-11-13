import { Context, createElement } from "@b9g/crank";

type Props = {
    round?: number;
}

export function Header(this: Context, props: Props) {

    return (
        <div class="header">
            <h1>Can't Math</h1>
            {!!props.round && (
                <span class="status">Round: {props.round}</span>
            )}
        </div>
    )
}
