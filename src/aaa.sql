SELECT

( SELECT status
    FROM mahasiswa_detail
    WHERE nim =  'G64130076') AS statusProfile,

( SELECT EXISTS (
    SELECT *
    FROM ta_daftar
    WHERE nim =  'G64130076')
  ) AS statusDaftar,

( SELECT EXISTS (
    SELECT *
    FROM ta
    WHERE nim =  'G64130076')
  ) AS statusTa,

( SELECT EXISTS (
    SELECT *
    FROM ta_kolokium
    WHERE nim =  'G64130076')
  ) AS statusKolokium,

( SELECT EXISTS (
    SELECT *
    FROM ta_praseminar
    WHERE nim =  'G64130076')
  ) AS statusPrasminar,

( SELECT EXISTS (
    SELECT *
    FROM ta_seminar
    WHERE nim =  'G64130076')
  ) AS statusSeminar,

( SELECT EXISTS (
    SELECT *
    FROM ta_sidang
    WHERE nim =  'G64130076')
  ) AS statusSidang,

( SELECT EXISTS (
    SELECT *
    FROM ta_skl
    WHERE nim =  'G64130076')
  ) AS statusSkl
