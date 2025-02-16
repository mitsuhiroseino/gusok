import Events from 'src/events/Events';

describe('Events', () => {
  test('on', () => {
    const events = new Events(),
      handler = jest.fn();
    events.on('test', handler);
    events.fire('test', { result: true });

    expect(handler).toHaveBeenCalledWith({
      type: 'test',
      target: events,
      params: { result: true },
    });
  });

  test('addHandlers', () => {
    const events = new Events(),
      handler1 = jest.fn(),
      handler2 = jest.fn();
    events.addHandlers({
      test1: handler1,
      test2: handler2,
    });

    events.fire('test1', { result: 'fire1' });
    events.fire('test2', { result: 'fire2' });

    expect(handler1).toHaveBeenCalledWith({
      type: 'test1',
      target: events,
      params: { result: 'fire1' },
    });
    expect(handler2).toHaveBeenCalledWith({
      type: 'test2',
      target: events,
      params: { result: 'fire2' },
    });
  });

  test('un (handler指定)', () => {
    const events = new Events();
    const handler1 = jest.fn(),
      handler2 = jest.fn();
    events.on('test', handler1);
    events.on('test', handler2);
    events.un('test', handler1);
    events.fire('test');

    expect(handler1).toBeCalledTimes(0);
    expect(handler2).toBeCalledTimes(1);
  });

  test('un (owner指定)', () => {
    const events = new Events();
    const owner1 = {},
      handler1 = jest.fn(),
      owner2 = {},
      handler2 = jest.fn();
    events.on('test', handler1, { owner: owner1 });
    events.on('test', handler2, { owner: owner2 });
    events.un('test', owner1);
    events.fire('test');

    expect(handler1).toBeCalledTimes(0);
    expect(handler2).toBeCalledTimes(1);
  });

  test('removeHandlers', () => {
    const events = new Events();
    const owner1 = {},
      handler1_1 = jest.fn(),
      handler1_2 = jest.fn(),
      owner2 = {},
      handler2_1 = jest.fn(),
      handler2_2 = jest.fn();
    events.addHandlers(
      {
        test1: handler1_1,
        test2: handler1_2,
      },
      { owner: owner1 },
    );
    events.addHandlers(
      {
        test1: handler2_1,
        test2: handler2_2,
      },
      { owner: owner2 },
    );
    events.removeHandlers(owner1);
    events.fire('test1');
    events.fire('test2');

    expect(handler1_1).toBeCalledTimes(0);
    expect(handler1_2).toBeCalledTimes(0);
    expect(handler2_1).toBeCalledTimes(1);
    expect(handler2_2).toBeCalledTimes(1);
  });

  describe('eventTransformation', () => {
    test('元イベントも発火', () => {
      const events = new Events({
          eventTransformation: {
            test: {
              type: 'transfered',
              convertParams: (params) => {
                return {
                  converted: true,
                  transferedResult: params.result,
                };
              },
            },
          },
        }),
        onTransfered = jest.fn(),
        onTest = jest.fn();

      events.on('transfered', onTransfered);
      events.on('test', onTest);
      events.fire('test', { result: true });

      expect(onTransfered).toBeCalledTimes(1);
      expect(onTransfered).toHaveBeenCalledWith({
        type: 'transfered',
        target: events,
        params: {
          converted: true,
          transferedResult: true,
        },
      });
      expect(onTest).toBeCalledTimes(1);
      expect(onTest).toHaveBeenCalledWith({
        type: 'test',
        target: events,
        params: { result: true },
      });
    });
    test('元イベントは発火しない', () => {
      const events = new Events({
          eventTransformation: {
            test: {
              type: 'transfered',
              omitOriginal: true,
            },
          },
        }),
        onTransfered = jest.fn(),
        onTest = jest.fn();

      events.on('transfered', onTransfered);
      events.on('test', onTest);
      events.fire('test', { result: true });

      expect(onTransfered).toBeCalledTimes(1);
      expect(onTransfered).toHaveBeenCalledWith({
        type: 'transfered',
        target: events,
        params: { result: true },
      });
      expect(onTest).toBeCalledTimes(0);
    });
  });

  test('once = true', () => {
    const events = new Events();
    const handler1 = jest.fn(),
      handler2 = jest.fn();
    events.on('test', handler1, { once: true });
    events.on('test', handler2);
    events.fire('test');
    events.fire('test');

    expect(handler1).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(2);
  });

  test('suppressEvents', () => {
    const events = new Events();
    const handler = jest.fn();
    events.on('test', handler);
    events.fire('test');
    expect(handler).toBeCalledTimes(1);
    events.fire('test');
    expect(handler).toBeCalledTimes(2);
    events.suppressEvents();
    events.fire('test');
    events.fire('test');
    expect(handler).toBeCalledTimes(2);
    events.unsuppressEvents();
    events.fire('test');
    expect(handler).toBeCalledTimes(3);
  });

  test('destructor', () => {
    const events = new Events();
    const handler1 = jest.fn(),
      handler2 = jest.fn();
    events.on('test', handler1);
    events.on('test', handler2);
    events.destructor();
    expect(events['_handlers']).toBeUndefined();
  });
});
