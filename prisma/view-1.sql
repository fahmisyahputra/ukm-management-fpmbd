-- SQLite
CREATE VIEW "ClubWithManagerView" AS
SELECT 
  c."ID" AS "ClubID",
  c."Name" AS "ClubName",
  c."Category",
  c."Description",
  c."Status",
  u."name" AS "ManagerName",
  u."email" AS "ManagerEmail"
FROM "Club" c
JOIN "User" u ON c."ManagerID" = u."ID";

