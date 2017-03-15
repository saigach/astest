import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()

export class PagerService {
    public pager = {
        numOfItems: 10,
        curPage: 1,
        totalPages: 0,
        numbers: Array()
    }

    public initPager(array: any[]): void {
        this.pager.totalPages = Math.ceil(array.length / this.pager.numOfItems)
        this.pager.numbers = Array(this.pager.totalPages).fill(1).map((x,i)=>i+1);
    }
    public setPage($event: Event, num: number): void {
        $event.preventDefault()
        this.pager.curPage = num
    }

    public getCurPage(): number {
        return this.pager.curPage
    }
    public getNumOfItems(): number {
        return this.pager.numOfItems
    }
}
