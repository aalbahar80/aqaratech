-- CreateEnum
CREATE TYPE "LeasePhase" AS ENUM ('FUTURE', 'ONGOING', 'COMPLETE');

CREATE VIEW "LeaseComputed" AS
SELECT
    "id",
    -- phase
    CASE
        WHEN "start" > NOW() THEN 'FUTURE'
        WHEN "end" < NOW() THEN 'COMPLETE'
        ELSE 'ONGOING'
    END::"LeasePhase" AS "phase"
FROM
    "Lease";
