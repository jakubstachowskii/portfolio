## What it does

The app runs the whole workflow of a grain purchase point in five modules:

- **Bookings** — delivery calendar, contractors, carriers, grain types, reports.
- **Purchasing** — intake, deliveries, price lists, contracts, documents, quality rules.
- **Warehouse** — warehouses, stock levels, batches, movements, transfers, stocktaking.
- **Quality** — lab tests, certificates, HACCP/GMP processes.
- **Sales** — customers, orders, invoices.

## How it works

Recording an intake automatically creates a warehouse movement: the grain from the purchasing dictionary is matched to the warehouse and saved in a single SQLite transaction, so stock never drifts between modules.

Data lives in a local SQLite database. Backup, restore and JSON export are available in the settings on the start screen. The app builds into a Windows installer.
