Sequel.migration do
  change do
    create_table :forks do
      primary_key :id

      String :data, :size => 1024 * 1024
    end
  end
end
