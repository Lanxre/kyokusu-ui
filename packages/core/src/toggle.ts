export class ToggleMachine {
  state: boolean;
  constructor(initial = false) { this.state = initial; }
  toggle() { this.state = !this.state; return this.state; }
}