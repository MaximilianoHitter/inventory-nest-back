export interface GeneralService {
    exists: (id: number) => void | Promise<boolean>
}