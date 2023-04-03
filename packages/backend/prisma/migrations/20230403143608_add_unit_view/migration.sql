CREATE VIEW "UnitComputed" AS
SELECT
    "id",
    COALESCE("label", "type" || ' ' || "unitNumber", "unitNumber") AS "title",
    DENSE_RANK() OVER (
        ORDER BY
            REGEXP_REPLACE(
                COALESCE("label", "type" || ' ' || "unitNumber", "unitNumber"),
                E'\\d+',
                '',
                'g'
            )
    ) * 10000
    + CASE
        WHEN "unitNumber" ~ '^\d*$' THEN CAST("unitNumber" AS INTEGER)
        ELSE 0
    END AS "titleScore"
FROM
    "Unit";
