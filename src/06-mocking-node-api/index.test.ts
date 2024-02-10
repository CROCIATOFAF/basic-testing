// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'fs';
import path from 'path';
import promises from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const join = jest.spyOn(path, 'join');
    const file = 'test.txt';
    await readFileAsynchronously(file);
    expect(join).toBeCalledWith(expect.any(String), file);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const outcome = await readFileAsynchronously('nonexistent.txt');
    expect(outcome).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    jest.spyOn(path, 'join');
    jest.spyOn(promises, 'readFile').mockResolvedValue('Content!');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const file = 'test.txt';
    const fileContent = await readFileAsynchronously(file);
    expect(fileContent).toBe('Content!');
  });
});
