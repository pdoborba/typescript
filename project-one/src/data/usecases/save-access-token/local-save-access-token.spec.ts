import { LocalSaveAccessToken } from './local-save-access-token';
import { SetStorageMock } from '@/data/test/index.mocks.data';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import faker from 'faker';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageSpy: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageSpy);
  return {
    sut,
    setStorageSpy,
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call setStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });

  test('should throw setStorage throws', async () => {
    const { sut, setStorageSpy } = makeSut();
    jest.spyOn(setStorageSpy, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.datatype.uuid());
    await expect(promise).rejects.toThrow(new Error());
  });

  test('should throw if accessToken is falsy', async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
