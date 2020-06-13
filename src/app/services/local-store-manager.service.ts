import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class LocalStoreManager {
    private pageProfile = '';
    private categoryId = 0;
    private reservedKeys: any =
        {
            token: 'token',
            numberCart: 'numberCart',
            postSelected: 'postSelected',
            dataPurchase: 'dataPurchase',
            urlAvatar: 'urlAvatar',
            storageCart: 'storageCart',
            checkLogin: 'checkLogin',
            userNameSelected: 'userNameSelected',
        };

    public getUserNameSelected(): string {
        return localStorage.getItem(this.reservedKeys.userNameSelected);
    }

    public setUserNameSelected(userName: string): void {
        localStorage.setItem(this.reservedKeys.userNameSelected, userName);
    }

    public getCheckLogin(): boolean {
        return localStorage.getItem(this.reservedKeys.checkLogin) === 'true';
    }

    public setCheckLogin(checkLogin: boolean): void {
        localStorage.setItem(this.reservedKeys.checkLogin, checkLogin.toString());
    }

    public setStorageCart(storageCart: string): void {
        if (this.getStorageCart() === null) {
            localStorage.setItem(this.reservedKeys.storageCart, '[' + storageCart + ']');
            this.addNumberCart();
        } else {
            const cart = JSON.parse(storageCart);
            const arr = JSON.parse(this.getStorageCart());
            let check = false;
            for (const element of arr) {
                if (element.postId === cart.postId) {
                    element.numberItem += cart.numberItem;
                    check = true;
                    break;
                }
            }
            if (!check) {
                arr.unshift(cart);
                this.addNumberCart();
            }
            localStorage.setItem(this.reservedKeys.storageCart, JSON.stringify(arr));
        }
    }

    public removeItemOnCart(storage: any): string {
        if (localStorage.getItem(this.reservedKeys.storageCart) === null) {
            return;
        } else {
            const arrBefore = JSON.parse(this.getStorageCart());
            const arrAfter = arrBefore.filter(element => element.postId !== storage.postId);
            localStorage.setItem(this.reservedKeys.storageCart, JSON.stringify(arrAfter));
            this.subNumberCart();
        }
    }

    public removeStorageCart() {
        localStorage.removeItem(this.reservedKeys.storageCart);
        this.deleteNumberCart();
    }

    public getStorageCart(): string {
        return localStorage.getItem(this.reservedKeys.storageCart);
    }

    public clearAll(): void {
        localStorage.clear();
    }

    public setUrlAvatar(urlAvatar: string): void {
        localStorage.setItem(this.reservedKeys.urlAvatar, urlAvatar);
    }

    public getUrlAvatar(): string {
        return localStorage.getItem(this.reservedKeys.urlAvatar);
    }
    public setDataPurchase(dataPurchase: string): void {
        localStorage.setItem(this.reservedKeys.dataPurchase, dataPurchase);
    }

    public getDataPurchase(): string {
        return localStorage.getItem(this.reservedKeys.dataPurchase);
    }

    public setCategoryId(categoryId: number): void {
        this.categoryId = categoryId;
    }

    public getCategoryId(): number {
        return this.categoryId;
    }

    public setPageProfile(pageProfile: string): void {
        this.pageProfile = pageProfile;
    }

    public getPageProfile(): string {
        return this.pageProfile;
    }

    public setPostSelected(postSelected: string): void {
        localStorage.setItem(this.reservedKeys.postSelected, postSelected);
    }

    public getPostSelected(): string {
        return localStorage.getItem(this.reservedKeys.postSelected);
    }

    public setNumberCart(numberCart: string): void {
        localStorage.setItem(this.reservedKeys.numberCart, numberCart);
    }

    public getNumberCart(): number {
        let numberCart = Number.parseInt(localStorage.getItem(this.reservedKeys.numberCart));
        if (localStorage.getItem(this.reservedKeys.numberCart) === null || Number.isNaN(numberCart)) {
            this.setNumberCart('0');
            numberCart = 0;
        }
        return numberCart;
    }

    public addNumberCart() {
        if (this.getNumberCart() === null) {
            localStorage.setItem(this.reservedKeys.numberCart, '0');
        }
        const abc: any = this.getNumberCart();
        localStorage.setItem(this.reservedKeys.numberCart, (this.getNumberCart() + 1).toString());
    }

    public subNumberCart(): void {
        if (this.getNumberCart() > 0) {
            localStorage.setItem(this.reservedKeys.numberCart, (this.getNumberCart() - 1).toString());
        }
    }

    public deleteNumberCart(): void {
        localStorage.removeItem(this.reservedKeys.numberCart);
    }

    public setToken(token: string): void {
        localStorage.setItem(this.reservedKeys.token, token);
    }

    public removeToken() {
        localStorage.removeItem(this.reservedKeys.token);
    }

    public getToken(): string {
        return localStorage.getItem(this.reservedKeys.token);
    }

}

