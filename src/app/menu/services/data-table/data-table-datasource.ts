import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  id: number;
  name: string;
  firstService: string;
  secondService: string;
  thirdService: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {id: 1, name: 'Junior Stylist', firstService: 35 + ' €', secondService: 38 + ' €', thirdService: 39 + ' €'},
  {id: 2, name: 'Regular Stylist', firstService: 45 + ' €', secondService: 48 + ' €', thirdService: 49 + ' €'},
  {id: 3, name: 'Mid Level Stylist', firstService: 55 + ' €', secondService: 58 + ' €', thirdService: 59 + ' €'},
  {id: 4, name: 'Senior Stylist', firstService: 65 + ' €', secondService: 68 + ' €', thirdService: 69 + ' €'},
  {id: 5, name: 'Chef of Stylists', firstService: 75 + ' €', secondService: 78 + ' €', thirdService: 79 + ' €'},
  {id: 6, name: 'Director', firstService: 85 + ' €', secondService: 88 + ' €', thirdService: 89 + ' €'},
  {id: 7, name: 'Art Director', firstService: 95 + ' €', secondService: 98 + ' €', thirdService: 99 + ' €'},
  {id: 8, name: 'Creative Director', firstService: 105 + ' €', secondService: 108 + ' €', thirdService: 109 + ' €'},
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'firstService': return compare(+a.firstService, +b.firstService, isAsc);
        case 'secondService': return compare(+a.secondService, +b.secondService, isAsc);
        case 'thirdService': return compare(+a.thirdService, +b.thirdService, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
