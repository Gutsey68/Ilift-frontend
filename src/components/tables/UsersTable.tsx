import { useInfiniteQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, OnChangeFn, SortingState, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchUsersAdmin } from '../../services/usersService';
import { UserAdminType } from '../../types/usersAdminType';
import UserDetailsModal from '../modals/UserDetailsModal';
import Badge from '../ui/Badge';

const FETCH_SIZE = 50;

const UsersTable = () => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedUser, setSelectedUser] = useState<UserAdminType | null>(null);

  const columns = useMemo<ColumnDef<UserAdminType>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 250
      },
      {
        accessorKey: 'pseudo',
        header: 'Pseudo',
        size: 200
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 300
      },
      {
        accessorKey: 'createdAt',
        header: 'Date création',
        size: 120,
        cell: info => new Date(info.getValue<string>()).toLocaleDateString('fr-FR')
      },
      {
        accessorKey: 'isBan',
        header: 'Statut',
        size: 100,
        cell: info => <Badge variant={info.getValue() ? 'destructive' : 'default'}>{info.getValue() ? 'Banni' : 'Actif'}</Badge>
      },
      {
        accessorKey: '_count.posts',
        header: 'Posts',
        size: 80
      },
      {
        accessorKey: '_count.followedBy',
        header: 'Abonnés',
        size: 80
      }
    ],
    []
  );

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ['usersAdmin', sorting],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchUsersAdmin((pageParam - 1) * FETCH_SIZE, FETCH_SIZE, sorting);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data?.length) return undefined;
      const nextPage = allPages.length + 1;
      const totalPages = Math.ceil(lastPage.meta.totalRowCount / FETCH_SIZE);
      return nextPage <= totalPages ? nextPage : undefined;
    },
    refetchOnWindowFocus: false
  });

  const flatData = useMemo(() => data?.pages?.flatMap(page => page.data) ?? [], [data]);
  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const handleSortingChange: OnChangeFn<SortingState> = updater => {
    setSorting(updater);
    setTimeout(() => {
      if (rowVirtualizer?.scrollToIndex && tableContainerRef.current) {
        try {
          rowVirtualizer.scrollToIndex(0, {
            align: 'start',
            behavior: 'smooth'
          });
        } catch {
          tableContainerRef.current.scrollTop = 0;
        }
      } else {
        tableContainerRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 0);
  };

  const table = useReactTable({
    data: flatData,
    columns,
    state: { sorting },
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 45,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? element => element?.getBoundingClientRect().height ?? 45 : undefined,
    overscan: 5,
    scrollToFn: (offset, { behavior }) => {
      tableContainerRef.current?.scrollTo({
        top: offset,
        behavior: behavior as ScrollBehavior
      });
    }
  });

  const handleRowClick = (user: UserAdminType) => {
    setSelectedUser(user);
  };

  if (isLoading) return <LoaderCircle className="animate-spin" size={20} />;

  return (
    <div>
      <div className="mb-4">
        {totalFetched} sur {totalDBRowCount} lignes chargées
      </div>
      <div
        ref={tableContainerRef}
        className="relative h-[600px] overflow-auto rounded-lg border border-neutral-4 bg-neutral-2"
        onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      >
        <table className="grid min-w-full">
          <thead className="sticky top-0 z-10 grid bg-neutral-3 text-neutral-12">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="flex w-full">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className={`flex px-6 py-3 text-left text-xs font-medium uppercase text-neutral-11`} style={{ width: header.getSize() }}>
                    <div className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''} onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' ↑',
                        desc: ' ↓'
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="relative grid" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  ref={node => rowVirtualizer.measureElement(node)}
                  data-index={virtualRow.index}
                  onClick={() => handleRowClick(row.original)}
                  className="absolute flex w-full cursor-pointer text-neutral-11 hover:bg-neutral-4"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      style={{
                        display: 'flex',
                        width: cell.column.getSize()
                      }}
                      className="whitespace-nowrap px-6 py-4 text-sm"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isFetching && (
        <div className="flex w-full justify-center">
          <LoaderCircle className="animate-spin" size={20} />
        </div>
      )}
      {selectedUser && <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
};

export default UsersTable;
