export enum StorageType{
    local,
    session,
    cookie
}
interface VStorageInterface{
    rcSetItem<T>(type: StorageType, key: string, value: T): void
    rcGetItem(type: StorageType, key: string): string | null
    rcRemoveItem(type: StorageType, key: string): void
}

class VStorage implements VStorageInterface {
    private static instance: VStorage

    static shared() {
        if (!this.instance) {
          this.instance = new VStorage()
        }
        return this.instance
    }

    rcSetItem<T>(type: StorageType = StorageType.local, key: string, value: T) {
        const valueJson = JSON.stringify(value)
        if (type === StorageType.local) {
            localStorage.setItem(key, valueJson)
        } else if (type === StorageType.session) {
            sessionStorage.setItem(key, valueJson)
        }else {
        }
    }

    rcGetItem(type: StorageType = StorageType.local, key: string): any {
        if (type === StorageType.local) {
            return JSON.parse(localStorage.getItem(key))
        } else if (type === StorageType.session) {
            return sessionStorage.getItem(key)
        } else {
        }
    }

    rcRemoveItem(type: StorageType = StorageType.local, key: string) {
        if (type === StorageType.local) {
            localStorage.removeItem(key)
        } else if (type === StorageType.session) {
            sessionStorage.removeItem(key)
        }
    }
}
export default VStorage.shared()