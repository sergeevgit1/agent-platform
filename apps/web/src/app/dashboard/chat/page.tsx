export default function ChatPage() {
  return (
    <div className="p-6">
      <h1 className="font-pixel text-xs uppercase tracking-wider text-foreground">Chat</h1>
      <p className="mt-1 text-sm text-muted-foreground">Coming soon — chat with your agents directly.</p>
      <div className="mt-6 rounded-xl border border-dashed border-border/60 bg-muted/20 p-12 text-center">
        <p className="font-pixel text-[10px] uppercase tracking-wider text-muted-foreground/60">
          Agent Chat Interface
        </p>
        <p className="mt-2 text-xs text-muted-foreground/40">Connect to the agent runtime to enable real-time conversation.</p>
      </div>
    </div>
  );
}
