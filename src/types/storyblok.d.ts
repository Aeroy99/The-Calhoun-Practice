interface StoryblokBridgeStory {
  id?: number;
  content?: unknown;
}

interface StoryblokBridgeEvent {
  story?: StoryblokBridgeStory;
}

type StoryblokBridgeEventName = "input" | "published" | "change";

interface StoryblokBridgeInstance {
  on(
    eventName: StoryblokBridgeEventName | StoryblokBridgeEventName[],
    callback: (event: StoryblokBridgeEvent) => void,
  ): void;
}

interface StoryblokBridgeConstructor {
  new (): StoryblokBridgeInstance;
}

interface Window {
  StoryblokBridge?: StoryblokBridgeConstructor;
}
