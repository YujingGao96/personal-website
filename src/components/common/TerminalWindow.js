const TerminalWindow = ({children, style}) => (
    <div className="terminal-window" style={style}>
        <div className="terminal-window-topbar">
            <span className="terminal-window-control terminal-window-control-close"/>
            <span className="terminal-window-control terminal-window-control-minimize"/>
            <span className="terminal-window-control terminal-window-control-expand"/>
        </div>
        {children}
    </div>
);

export default TerminalWindow;
