// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  getBankAccount,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let accountForTest: BankAccount;

  beforeEach(() => {
    accountForTest = getBankAccount(111);
  });

  test('should create account with initial balance', () => {
    // Write your test here
    const account = new BankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = new BankAccount(100);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const accountFrom = new BankAccount(100);
    const accountTo = new BankAccount(100);
    expect(() => accountFrom.transfer(200, accountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = new BankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = new BankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const accountFrom = new BankAccount(100);
    const accountTo = new BankAccount(50);
    accountFrom.transfer(50, accountTo);
    expect(accountFrom.getBalance()).toBe(50);
    expect(accountTo.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    accountForTest.fetchBalance = jest.fn().mockResolvedValue(50);
    const result = await accountForTest.fetchBalance();
    expect(result).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    accountForTest.fetchBalance = jest.fn().mockResolvedValue(60);
    await accountForTest.synchronizeBalance();
    expect(accountForTest.getBalance()).toBe(60);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    accountForTest.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(accountForTest.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
