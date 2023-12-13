
export class Throttle
{
    private updateIntervalMillis: number;
    private timerId: number | undefined = undefined;
    private pendingAction: (() => void) | undefined = undefined;

    constructor(_updateIntervalMillis: number)
    {
        this.updateIntervalMillis = _updateIntervalMillis;
    }

    private TimeoutHandler()
    {
        if(this.pendingAction) this.pendingAction();
        
        this.pendingAction = undefined;
        this.timerId = undefined;
    }

    QueueAction(action: () => void)
    {
        if(this.timerId === undefined)
        {
            action();

            this.timerId = setTimeout(
                () => this.TimeoutHandler(), 
                this.updateIntervalMillis
            );
        }
        else
        {
            this.pendingAction = action;
        }
    }

    CancelPendingAction()
    {
        this.pendingAction = undefined;
    }
}