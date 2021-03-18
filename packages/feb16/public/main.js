// @ts-check

import { APIWrapper, API_EVENT_TYPE } from "./api.js";
import {
  addMessage,
  animateGift,
  isPossiblyAnimatingGift,
  isAnimatingGiftUI,
} from "./dom_updates.js";

const api = new APIWrapper(true, true, true);

class MessagesQueue {
  #messages = {
    [API_EVENT_TYPE.ANIMATED_GIFT]: [],
    [API_EVENT_TYPE.GIFT]: [],
    [API_EVENT_TYPE.MESSAGE]: [],
  };
  #flattenMessages = [];
  #autoDelete = true;

  constructor({ autoDelete = true } = {}) {
    this.#autoDelete = autoDelete;
  }

  add(messages) {
    if (Array.isArray(messages)) {
      messages.forEach((message) => this.#addQueue(message, message.type));
    } else if (!!messages?.type) {
      this.#addQueue(messages, messages.type);
    } // else ignore
    return this;
  }

  get({ id, type } = {}) {
    if (id) {
      return this.#getById(id);
    } else if (type) {
      return this.#getByType(type);
    } else {
      return this.#getFirst();
    }
  }

  remove(id) {
    const message = this.#flattenMessages.find((message) => message.id === id);
    if (!!message) {
      this.#messages[message.type].splice(
        this.#messages[message.type].findIndex((m) => m.id === message.id),
        1
      );
      this.#flatMessages();
    }
    return this;
  }

  #getById(id) {
    const message = this.#flattenMessages.find((message) => message.id === id);
    if (!message) {
      return;
    }
    if (this.#autoDelete) {
      this.remove(message.id);
    }
    return message;
  }

  #getByType(type) {
    if (!this.#messages[type].length) {
      return;
    }
    const message = this.#messages[type][0];
    if (this.#autoDelete) {
      this.remove(message.id);
    }
    return message;
  }

  #getFirst() {
    if (!this.#flattenMessages.length) {
      return;
    }
    const message = this.#flattenMessages[0];
    if (this.#autoDelete) {
      this.remove(message.id);
    }
    return message;
  }

  #isExist(id) {
    return this.#flattenMessages.some((message) => message.id === id);
  }

  #addQueue(message, type) {
    if (!this.#isExist(message.id)) {
      this.#messages[type].push(message);
      this.#flatMessages();
    }
    return this;
  }

  #flatMessages() {
    this.#flattenMessages = [
      ...this.#messages[API_EVENT_TYPE.ANIMATED_GIFT],
      ...this.#messages[API_EVENT_TYPE.GIFT],
      ...this.#messages[API_EVENT_TYPE.MESSAGE],
    ];
  }
}

const queue = new MessagesQueue();

api.setEventHandler((events) => {
  queue.add(events);
});

setInterval(() => {
  let m = queue.get({ type: API_EVENT_TYPE.MESSAGE });
  if (!isPossiblyAnimatingGift()) {
    let ag = queue.get({ type: API_EVENT_TYPE.ANIMATED_GIFT });
    if (ag) {
      animateGift(ag);
    }
  }
  if (m) {
    addMessage(m);
  } else {
    let g = queue.get({ type: API_EVENT_TYPE.GIFT });
    if (g) {
      addMessage(g);
    }
  }
}, 500);

// setInterval(() => {
//   let m = queue.get({ type: API_EVENT_TYPE.ANIMATED_GIFT });
//   if (m) {
//     animateGift(m);
//   }
// }, 500);

// NOTE: UI helper methods from `dom_updates` are already imported above.
